import React, {useEffect, useState} from "react";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {Box, Button, Container, Rating, Stack} from "@mui/material";
import {FreeMode, Navigation, Thumbs} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import CheckBox from "@mui/material/Checkbox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {useParams} from "react-router-dom";
//REDUX
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "reselect";
import {retrieveChosenBrand, retrieveChosenProduct} from "./selector";
import {Brand} from "../../../types/user";
import {Dispatch} from "@reduxjs/toolkit";
import {setChosenBrand, setChosenProduct} from "./slice";
import {Product} from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import BrandApiService from "../../apiServices/brandApiService";
import {serverApi} from "../../../lib/config";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import {Definer} from "../../../lib/Definer";
import {sweetErrorHandling, sweetTopSmallSuccessAlert,} from "../../../lib/sweetAlert";
import {verifiedMemberData} from "../../apiServices/verify";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setChosenBrand: (data: Brand) => dispatch(setChosenBrand(data)),
});

/** REDUX SELECTOR */
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const chosenBrandRetriever = createSelector(
  retrieveChosenBrand,
  (chosenBrand) => ({
    chosenBrand,
  })
);

export function ChosenProduct(props: any) {
  // INITIALIZATIONS
  const { setChosenProduct, setChosenBrand } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { chosenBrand } = useSelector(chosenBrandRetriever);
  let { product_id } = useParams<{ product_id: string }>();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  const productRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenProduct(
        product_id
      );
      setChosenProduct(product);

      const brandService = new BrandApiService();
      const brand = await brandService.getChosenBrand(product.brand_mb_id);
      setChosenBrand(brand);
    } catch (err) {
      console.log(`productRelatedProcess, ERROR: `, err);
    }
  };

  useEffect(() => {
    productRelatedProcess().then();
  }, [productRebuild]);

  /** HANDLERS */

  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("success", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="chosen_product_page">
      <Container className="product_container">
        <Stack className={"chosen_product_slider"}>
          <Swiper
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            navigation={true}
            // thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            autoplay={{delay: 3000, disableOnInteraction: true}}
            className="dish_swiper"
          >
            {chosenProduct?.product_images.map((ele: string) => {
              const image_path = `${serverApi}/${ele}`;
              return (
                <SwiperSlide className={"swiper-slide"}>
                  <Box className={"image_wrapper"}>
                  <img
                    src={image_path}
                    alt={"product_image"}
                  />
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            // onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={20}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            style={{ width: "450px", height: "245px", marginTop: "20px" }}
            className="mySwiper"
          >
            {chosenProduct?.product_images.map((ele: string) => {
              const image_path = `${serverApi}/${ele}`;
              return (
                <SwiperSlide

                  style={{
                    height: "107px",
                    display: "flex",
                  }}
                >
                  <img
                    src={image_path}
                    style={{
                      borderRadius: "8px",
                      height: "80px",
                      marginRight: "10px",
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>

        <Stack className={"chosen_product_info_container"}>
          <Box className={"chosen_product_info_box"}>
            <strong className={"dish_txt"}>
              {chosenProduct?.product_name}
            </strong>
            <span className={"resto_name"}>{chosenBrand?.mb_nick}</span>
            <span className="product_price">
              ${chosenProduct?.product_price}
            </span>
            <Box className={"rating_box"}>
              <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
              <div className="evaluation_box">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <CheckBox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{color: "red"}} />}
                    id={chosenProduct?._id}
                    onClick={targetLikeProduct}
                    checked={
                      !!(chosenProduct?.me_liked &&
                          chosenProduct?.me_liked[0]?.my_favorite)
                    }
                  />

                  <span>{chosenProduct?.product_likes} likes</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.product_views} views</span>
                </div>
              </div>
            </Box>
            <div className={"product_desc_info"}>
              {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "no description"}{" "}
            </div>

            <div className="button_box">
              <Button
                variant="outlined"
                style={{ color: "#000000", fontFamily: "Helvetica" }}
                onClick={() => {
                  props.onAdd(chosenProduct);
                }}
              >
                ADD TO CART
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
function setProductRebuild(arg0: Date) {
  throw new Error("Function not implemented.");
}
