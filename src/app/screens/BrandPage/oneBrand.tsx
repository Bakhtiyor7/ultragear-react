import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Collections,
  Favorite,
  FavoriteBorder,
  MonetizationOn,
} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import Checkbox from "@mui/material/Checkbox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";
import { useHistory, useParams } from "react-router-dom";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveChosenBrand,
  retrieveRandomBrands,
  retrieveTargetProducts,
} from "./selector";
import { Brand } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenBrand, setRandomBrands, setTargetProducts } from "./slice";

import { ProductSearchObj } from "../../../types/others";
import ProductApiService from "../../apiServices/productApiService";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";
import BrandApiService from "../../apiServices/brandApiService";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setRandomBrands: (data: Brand[]) => dispatch(setRandomBrands(data)),
  setChosenBrand: (data: Brand) => dispatch(setChosenBrand(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

/** REDUX SELECTOR */
const randomBrandsRetriever = createSelector(
  retrieveRandomBrands,
  (randomBrands) => ({
    randomBrands,
  })
);
const chosenBrandRetriever = createSelector(
  retrieveChosenBrand,
  (chosenBrand) => ({
    chosenBrand,
  })
);
const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);

export function OneBrand(props: any) {
  /** INITIALIZATIONS */
  const history = useHistory();
  let { brand_id } = useParams<{ brand_id: string }>();
  const { setRandomBrands, setChosenBrand, setTargetProducts } = actionDispatch(
    useDispatch()
  );
  const { randomBrands } = useSelector(randomBrandsRetriever);
  const { chosenBrand } = useSelector(chosenBrandRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);
  const [chosenBrandId, setChosenBrandId] = useState<string>(brand_id);
  const [targetProductSearchObject, setTargetProductSearchObject] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 8,
      order: "createdAt",
      brand_mb_id: brand_id,
      product_collection: "keyboard",
    });
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    const brandService = new BrandApiService();
    brandService
      .getBrands({ page: 1, limit: 10, order: "random" })
      .then((data) => setRandomBrands(data))
      .catch((err) => console.log(err));

    brandService
      .getChosenBrand(chosenBrandId)
      .then((data) => setChosenBrand(data))
      .catch((err) => console.log(err));

    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObject)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [chosenBrandId, targetProductSearchObject, productRebuild]);
  /** HANDLERS */
  const chosenBrandHandler = (id: string) => {
    setChosenBrandId(id);
    targetProductSearchObject.brand_mb_id = id;
    setTargetProductSearchObject({ ...targetProductSearchObject });
    history.push(`/brand/${id}`);
  };

  const searchCollectionHandler = (collection: string) => {
    targetProductSearchObject.page = 1;
    targetProductSearchObject.product_collection = collection;
    setTargetProductSearchObject({ ...targetProductSearchObject });
  };
  const searchOrderHandler = (order: string) => {
    targetProductSearchObject.page = 1;
    targetProductSearchObject.order = order;
    setTargetProductSearchObject({ ...targetProductSearchObject });
  };
  const chosenDishHandler = (id: string) => {
    history.push(`/brand/keyboard/${id}`);
  };

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
    <div className="single_restaurant">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar_big_box"}>
            <Box className={"top_text"}>
              <p></p>
              <Box className={"single_search_big_box"}>
                <form className={"single_search_form"} action={""} method={""}>
                  <input
                    type={"search"}
                    className={"Single_searchInput"}
                    name={"Single_reSearch"}
                    placeholder={"Qidiruv"}
                  />
                  <Button
                    className={"Single_button_search"}
                    variant={"contained"}
                    endIcon={<SearchIcon />}
                  >
                    Izlash
                  </Button>
                </form>
              </Box>
            </Box>
          </Stack>

          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
            sx={{ mt: "35px" }}
          >
            <Box className={"prev_btn restaurant-prev"}>
              <ArrowBackIosNewIcon
                sx={{ fontSize: 40 }}
                style={{ color: "white" }}
              />
            </Box>
            <Swiper
              className={"restaurant_avatars_wrapper"}
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                nextEl: ".restaurant-next",
                prevEl: ".restaurant-prev",
              }}
            >
              {randomBrands.map((ele: Brand) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <SwiperSlide
                    onClick={() => chosenBrandHandler(ele._id)}
                    style={{ cursor: "pointer" }}
                    key={ele._id}
                    className={"restaurant_avatars"}
                  >
                    <img src={image_path} />
                    <span>{ele.mb_nick}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box
              className={"next_btn restaurant-next"}
              style={{ color: "white" }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
            </Box>
          </Stack>

          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
            width={"90%"}
            sx={{ mt: "65px" }}
          >
            <Box className={"dishs_filter_box"}>
              <Button
                variant={"contained"}
                color="secondary"
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color="secondary"
                onClick={() => searchOrderHandler("product_price")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color="secondary"
                onClick={() => searchOrderHandler("product_likes")}
              >
                Likes
              </Button>
              <Button
                variant={"contained"}
                color="secondary"
                onClick={() => searchOrderHandler("product_views")}
              >
                Views
              </Button>
            </Box>
          </Stack>

          <Stack
            style={{ width: "100%", display: "flex", minHeight: "60px" }}
            flexDirection={"row"}
          >
            <Stack className={"dish_category_box"}>
              <div className={"dish_category_main"}>
                <Button
                  variant={"contained"}
                  color="secondary"
                  onClick={() => searchCollectionHandler("etc")}
                >
                  others
                </Button>
                <Button
                  variant={"contained"}
                  color="secondary"
                  onClick={() => searchCollectionHandler("earphone")}
                >
                  earphone
                </Button>
                <Button
                  variant={"contained"}
                  color="secondary"
                  onClick={() => searchCollectionHandler("headset")}
                >
                  headset
                </Button>
                <Button
                  variant={"contained"}
                  color="secondary"
                  onClick={() => searchCollectionHandler("mouse")}
                >
                  mice
                </Button>
                <Button
                  variant={"contained"}
                  color="secondary"
                  onClick={() => searchCollectionHandler("keyboard")}
                >
                  keyboard
                </Button>
              </div>
            </Stack>

            <Stack className={"dish_wrapper"}>
              {targetProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;
                return (
                  <Box
                    className={"dish_box"}
                    key={product._id}
                    onClick={() => chosenDishHandler(product._id)}
                  >
                    <Box
                      className="dish_img"
                      sx={{
                        backgroundImage: `url(${image_path} )`,
                      }}
                    >
                      <div className={"dish_sale"}></div>
                      <Button
                        className={"like_view_btn"}
                        style={{ left: "36px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Badge
                          badgeContent={product.product_likes}
                          color={"primary"}
                        >
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={product._id}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            onClick={targetLikeProduct}
                            checked={
                              product?.me_liked &&
                              product?.me_liked[0]?.my_favorite
                                ? true
                                : false
                            }
                          />
                        </Badge>
                      </Button>
                      <Button
                        className={"view_btn"}
                        onClick={(e) => {
                          props.onAdd(product);
                          e.stopPropagation();
                        }}
                      >
                        <img
                          src={"/icons/shopping_cart.svg"}
                          style={{ display: "flex" }}
                        />
                      </Button>
                      <Button
                        className={"like_view_btn"}
                        style={{ right: "36px" }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Badge
                          badgeContent={product.product_views}
                          color="primary"
                        >
                          <Checkbox
                            icon={
                              <RemoveRedEyeIcon style={{ color: "white" }} />
                            }
                          />
                        </Badge>
                      </Button>
                    </Box>

                    <Box className={"dish_desc"}>
                      <span className={"dish_title_text"}>
                        {product.product_name}
                      </span>
                      <span className={"dish_desc_text"}>
                        <MonetizationOn />
                        {product.product_price}
                      </span>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <div className={"review_for_restaurant"}>
        <Container
          sx={{ mt: "100px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className={"category_title"}>Oshxona haqida fikrlar</Box>
          <Stack
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {Array.from(Array(4).keys()).map((ele, index) => {
              return (
                <Box className={"review_box"} key={index}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <img
                      src={"/community/girl.jpeg"}
                      className={"review_img"}
                    />
                  </Box>
                  <span className={"review_name"}>Kim Jeong Won</span>
                  <span className={"review_prof"}>Foydalanuvchi</span>
                  <p className={"review_desc"}>
                    I really like the food by this restaurant and the atmosphere
                    is very good.
                  </p>
                  <div className={"review_stars"}>
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                  </div>
                </Box>
              );
            })}
          </Stack>
        </Container>
      </div>

      <Container className={"member_reviews"}>
        <Box className={"category_title"}>Oshxona haqida</Box>
        <Stack
          display={"flex"}
          flexDirection={"row"}
          width={"90%"}
          sx={{ mt: "70px" }}
        >
          <Box
            className={"about_left"}
            sx={{
              backgroundImage: `url(${serverApi}/${chosenBrand?.mb_image})`,
            }}
          >
            <div className={"about_left_desc"}>
              <span>{chosenBrand?.mb_nick}</span>
              <p>{chosenBrand?.mb_description}</p>
            </div>
          </Box>
          <Box className={"about_right"}>
            {Array.from(Array(3).keys()).map((ele, index) => {
              return (
                <Box display={"flex"} flexDirection={"row"} key={index}>
                  <div className={"about_right_img"}></div>
                  <div className={"about_right_desc"}>
                    <span>Bizning mohir oshpazlarimiz </span>
                    <p>
                      Bizning oshpazlar ajoyib oshpazlar chet eldagi taniqli
                      restoranlarda malaka orttirib kelishgan
                    </p>
                  </div>
                </Box>
              );
            })}
          </Box>
        </Stack>

        <Stack
          sx={{ mt: "60px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className={"category_title"}>Oshxona Manzili</Box>
          <iframe
            style={{ marginTop: "60px" }}
            src="https://goo.gl/maps/P3RJYG8Mo3jZSmDv8"
            width="1320"
            height="500"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Stack>
      </Container>
    </div>
  );
}
