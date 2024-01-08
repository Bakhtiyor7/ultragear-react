import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import Checkbox from "@mui/material/Checkbox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
import ClipLoader from "react-spinners/ClipLoader";
import ProductList from "../../components/brandPage/productList";

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
  const { setRandomBrands, setChosenBrand, setTargetProducts } =
    actionDispatch(useDispatch());
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const brandService = new BrandApiService();
        await brandService
          .getBrands({ page: 1, limit: 10, order: "random" })
          .then((data) => setRandomBrands(data))
          .catch((err) => console.log(err));

        await brandService
          .getChosenBrand(chosenBrandId)
          .then((data) => setChosenBrand(data))
          .catch((err) => console.log(err));

        const productService = new ProductApiService();
        await productService
          .getTargetProducts(targetProductSearchObject)
          .then((data) => setTargetProducts(data))
          .catch((err) => console.log(err));

        setLoading(false);
      } catch (error) {
        console.log("Error loading data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [chosenBrandId, targetProductSearchObject, productRebuild]);
  /** HANDLERS */
  const chosenBrandHandler = (id: string) => {
    setChosenBrandId(id);
    targetProductSearchObject.brand_mb_id = id;
    setTargetProductSearchObject({ ...targetProductSearchObject });
    history.push(`/brand/${id}`);
  };

  const [sortValue, setSortValue] = useState("");

  const handleChange = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value;
    setSortValue(selectedValue);

    // Call searchOrderHandler with the selected sorting criteria
    searchOrderHandler(selectedValue);
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
  const chosenProductHandler = (id: string) => {
    history.push(`/brand/products/${id}`);
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
    <div className="single_brand">
      {loading ? (
        <div className={"loader_wrapper"}>
          <ClipLoader
            color={"#00BFFF"}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <Container>
            <Stack className="head_information_brand">
              <img src="/home/rectangle.png" alt="" className="rectangle" />
              <Box className="header_title">
                <h1>{chosenBrand?.mb_nick} Products Menu</h1>
              </Box>

              <Box className="head_info_box">
                <Box className="category_box"></Box>
              </Box>
            </Stack>
            <Stack flexDirection={"column"} alignItems={"center"}>
              <Stack
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                width={"90%"}
                style={{ marginTop: "20px" }}
              >
                <Tabs
                  className={"category_holder"}
                  value={targetProductSearchObject.product_collection}
                  onChange={(event, newValue) => {
                    searchCollectionHandler(newValue);
                  }}
                  TabIndicatorProps={{
                    style: { display: "none" },
                  }}
                >
                  <Tab
                    className="category_button"
                    label="Keyboards"
                    value={"keyboard"}
                  />
                  <Tab
                    className="category_button"
                    label="Mouse"
                    value={"mouse"}
                  />
                  <Tab
                    className="category_button"
                    label="Headsets"
                    value={"headset"}
                  />
                  <Tab
                    className="category_button"
                    label="earphone"
                    value={"earphone"}
                  />

                  <Tab
                    className="category_button"
                    label="monitor"
                    value={"monitor"}
                  />

                  <Tab
                    className="category_button"
                    label="laptop"
                    value={"laptop"}
                  />

                  <Tab
                    className="category_button"
                    label="others"
                    value={"others"}
                  />
                </Tabs>
              </Stack>

              <Box className={"fill_search_box"}>
                <FormControl style={{ width: "138px", height: "45px" }}>
                  <InputLabel id="sort-by-label">SORT BY :</InputLabel>
                  <Select
                    labelId="sort-by-label"
                    id="sort-by"
                    value={sortValue}
                    label="SORT BY:"
                    onChange={handleChange}
                  >
                    <MenuItem
                      value="createdAt"
                      onClick={() => searchOrderHandler("createdAt")}
                    >
                      New
                    </MenuItem>
                    <MenuItem
                      value="product_price"
                      onClick={() => searchOrderHandler("product_price")}
                    >
                      Price: Low to high
                    </MenuItem>
                    <MenuItem
                      value="product_likes"
                      onClick={() => searchOrderHandler("product_likes")}
                    >
                      Most Liked
                    </MenuItem>
                    <MenuItem
                      value="product_views"
                      onClick={() => searchOrderHandler("product_views")}
                    >
                      Most viewed
                    </MenuItem>
                  </Select>
                </FormControl>

                <Box className={"search_big_box"}>
                  <form className={"search_form"} action={""} method={""}>
                    <input
                      type={"search"}
                      className={"searchInput"}
                      name={"resSearch"}
                      placeholder={"search"}
                      style={{ border: "none" }}
                    />
                    <Button
                      className={"button_search"}
                      variant="contained"
                      sx={{
                        color: "black",
                        "&:hover": {
                          backgroundColor: "#edf3fc",
                        },
                        "&.Mui-selected": {
                          color: "#fff",
                        },
                      }}
                    >
                      <SearchIcon />
                    </Button>
                  </form>
                </Box>
              </Box>

              <Stack
                style={{ width: "100%", display: "flex", minHeight: "60px" }}
                flexDirection={"row"}
              >
                <ProductList
                  products={targetProducts}
                  chosenProductHandler={chosenProductHandler}
                  onAdd={props.onAdd}
                  targetLikeProduct={targetLikeProduct}
                />
              </Stack>
              <Stack
                style={{
                  width: "100%",
                  display: "flex",
                  backgroundColor: "#E9EFFF",
                }}
                flexDirection={"row"}
                sx={{ mt: "35px" }}
              >
                <Box className={"prev_btn brand-prev"}>
                  <ArrowBackIosNewIcon
                    sx={{ fontSize: 40 }}
                    style={{ color: "black" }}
                  />
                </Box>
                <Swiper
                  className={"brand_avatars_wrapper"}
                  slidesPerView={6}
                  centeredSlides={false}
                  spaceBetween={50}
                  navigation={{
                    nextEl: ".brand-next",
                    prevEl: ".brand-prev",
                  }}
                >
                  {randomBrands.map((ele: Brand) => {
                    const image_path = `${serverApi}/${ele.mb_image}`;
                    return (
                      <SwiperSlide
                        onClick={() => chosenBrandHandler(ele._id)}
                        style={{ cursor: "pointer" }}
                        key={ele._id}
                        className={"brand_avatars"}
                      >
                        <img src={image_path} alt={"brand_image"} />

                        {/* <span>{ele.mb_nick}</span> */}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <Box
                  className={"next_btn restaurant-next"}
                  style={{ color: "black" }}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
                </Box>
              </Stack>
            </Stack>
          </Container>

          <div className="brand_review">
            <Container
              sx={{ mt: "100px" }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box className={"category_title"}>CUSTOMER REVIEWS</Box>
              <Stack
                flexDirection={"row"}
                display={"flex"}
                width={"100%"}
                style={{ marginTop: "20px", borderBottom: "0.5px solid gray" }}
              >
                <Box className="review_left">
                  <Box display={"flex"} alignItems={"center"}>
                    <img
                      src="/community/kazuha.jpeg"
                      className="review_img"
                      alt={"author_image"}
                    />
                  </Box>
                </Box>
                <Stack className="review_right">
                  <Box>
                    <p className="review_title">
                      I am satisfied with the products but could be better
                    </p>
                    <div className={"review_stars"}>
                      <StarIcon style={{ color: "#F2BD57" }} />
                      <StarIcon style={{ color: "#F2BD57" }} />
                      <StarIcon style={{ color: "#F2BD57" }} />
                      <StarIcon style={{ color: "whitesmoke" }} />
                      <StarIcon style={{ color: "whitesmoke" }} />
                    </div>
                  </Box>
                  <Box className="review_text">
                    I am overall satisfied with the functionality of the
                    products, they almost do what I want and need for work. But
                    some of the products feel kind plasticy and low quality. But
                    the product works just fine if you are not obsessed with the
                    build quality like me. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Deserunt, explicabo, sint,
                    debitis quasi voluptatibus voluptatem aspernatur dicta
                    itaque enim facilis et incidunt molestias ea at excepturi
                    maxime dolore. Cupiditate, rem.
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    sx={{ mt: "20px", mb: "20px" }}
                  >
                    <FavoriteIcon
                      className="review_icons"
                      style={{ color: "red" }}
                    />
                    <ChatBubbleIcon className="review_icons" />
                    <MoreHorizIcon className="review_icons" />
                  </Box>
                </Stack>
              </Stack>

              <Stack
                flexDirection={"row"}
                display={"flex"}
                width={"100%"}
                style={{ marginTop: "20px", borderBottom: "0.5px solid gray" }}
              >
                <Box className="review_left">
                  <Box display={"flex"} alignItems={"center"}>
                    <img
                      src="/community/justin.webp"
                      className="review_img"
                      alt={"author_image"}
                    />
                  </Box>
                </Box>
                <Stack className="review_right">
                  <Box>
                    <p className="review_title">
                      They are making changes finally
                    </p>
                    <div className={"review_stars"}>
                      <StarIcon style={{ color: "#F2BD57" }} />
                      <StarIcon style={{ color: "#F2BD57" }} />
                      <StarIcon style={{ color: "#F2BD57" }} />
                      <StarIcon style={{ color: "whitesmoke" }} />
                      <StarIcon style={{ color: "whitesmoke" }} />
                    </div>
                  </Box>
                  <Box className="review_text">
                    Silent buttons and an 8,000dpi sensor bring Logitech's
                    flagship MX Master 3S Wireless Mouse just one or two clicks
                    from perfection. Logitech finally serves up office workers a
                    mechanical keyboard from its own stable. The wireless,
                    low-profile MX Mechanical is a winner, offered in two sizes
                    with three switch types.
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    sx={{ mt: "20px", mb: "20px" }}
                  >
                    <FavoriteIcon
                      className="review_icons"
                      style={{ color: "red" }}
                    />
                    <ChatBubbleIcon className="review_icons" />
                    <MoreHorizIcon className="review_icons" />
                  </Box>
                </Stack>
              </Stack>

              <Stack
                flexDirection={"row"}
                display={"flex"}
                width={"100%"}
                style={{ marginTop: "20px", borderBottom: "0.5px solid gray" }}
              >
                <Box className="review_left">
                  <Box display={"flex"} alignItems={"center"}>
                    <img
                      src="/community/guy.webp"
                      className="review_img"
                      alt={"author_image"}
                    />
                  </Box>
                </Box>
                <Stack className="review_right">
                  <Box>
                    <p className="review_title">I just love the design</p>
                    <div className={"review_stars"}>
                      <StarIcon style={{ color: "#F2BD57" }} />
                      <StarIcon style={{ color: "#F2BD57" }} />
                      <StarIcon style={{ color: "#F2BD57" }} />
                      <StarIcon style={{ color: "whitesmoke" }} />
                      <StarIcon style={{ color: "whitesmoke" }} />
                    </div>
                  </Box>
                  <Box className="review_text">
                    Smart illumination, fast charging, and recycled materials
                    makes for some tempting peripherals. A mechanical keyboard
                    for the TikTok generation, Logitech's POP Keys Mechanical
                    Wireless Keyboard has a lively look and unique
                    emoji-specific keys, though we wish it were a bit easier to
                    type on.
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    sx={{ mt: "20px", mb: "20px" }}
                  >
                    <FavoriteIcon
                      className="review_icons"
                      style={{ color: "red" }}
                    />
                    <ChatBubbleIcon className="review_icons" />
                    <MoreHorizIcon className="review_icons" />
                  </Box>
                </Stack>
              </Stack>

              <Stack
                flexDirection={"row"}
                display={"flex"}
                width={"100%"}
                style={{ marginTop: "20px", borderBottom: "0.5px solid gray" }}
              >
                <Box className="review_left">
                  <Box display={"flex"} alignItems={"center"}>
                    <img
                      src="/community/suzy.webp"
                      className="review_img"
                      alt={"author_image"}
                    />
                  </Box>
                </Box>
                <Stack className="review_right">
                  <Box>
                    <p className="review_title">I was expecting more</p>
                    <div className={"review_stars"}>
                      <StarIcon style={{ color: "#F2BD57" }} />
                      <StarIcon style={{ color: "#F2BD57" }} />
                      <StarIcon style={{ color: "#F2BD57" }} />
                      <StarIcon style={{ color: "whitesmoke" }} />
                      <StarIcon style={{ color: "whitesmoke" }} />
                    </div>
                  </Box>
                  <Box className="review_text">
                    Qaulity and the design is a not for me I guess. If you love
                    high quality and comfortable products maybe you should go
                    for another one. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Deserunt, explicabo, sint, debitis quasi
                    voluptatibus voluptatem aspernatur dicta itaque enim facilis
                    et incidunt molestias ea at excepturi maxime dolore.
                    Cupiditate, rem.
                  </Box>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    sx={{ mt: "20px", mb: "20px" }}
                  >
                    <FavoriteIcon
                      className="review_icons"
                      style={{ color: "red" }}
                    />
                    <ChatBubbleIcon className="review_icons" />
                    <MoreHorizIcon className="review_icons" />
                  </Box>
                </Stack>
              </Stack>
            </Container>
          </div>

          <Container className={"member_reviews"}></Container>
        </>
      )}
    </div>
  );
}
