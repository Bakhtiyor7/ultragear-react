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
  SelectChangeEvent,
  Stack,
} from "@mui/material";
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
  }, [
    chosenBrandId,
    targetProductSearchObject,
    productRebuild,
    // setRandomBrands,
    // setChosenBrand,
    // setTargetProducts,
  ]);
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
          {/* <Stack className={"avatar_big_box"}>
            <Box className={"top_text"}>
              <Box className={"single_search_big_box"}>
                <form className={"single_search_form"} action={""} method={""}>
                  <input
                    type={"search"}
                    className={"Single_searchInput"}
                    name={"Single_reSearch"}
                    placeholder={"Search"}
                  />
                  <Button
                    className={"Single_button_search"}
                    variant={"contained"}
                    endIcon={<SearchIcon />}
                  >
                    Search
                  </Button>
                </form>
              </Box>
            </Box>
          </Stack> */}

          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            width={"90%"}
            style={{ marginTop: "65px" }}
          >
            <Stack className={"category_holder"}>
              <Button
                className="category_button"
                onClick={() => searchCollectionHandler("keyboard")}
                sx={{
                  "&:focus": {
                    color: "#fff",
                    bgcolor: "#000",
                    borderRadius: "99px",
                  },
                }}
              >
                Keyboards
              </Button>
              <Button
                className="category_button"
                onClick={() => searchCollectionHandler("mouse")}
                sx={{
                  "&:focus": {
                    color: "#fff",
                    bgcolor: "#000",
                    borderRadius: "99px",
                  },
                }}
              >
                Mouse
              </Button>
              <Button
                className="category_button"
                onClick={() => searchCollectionHandler("headset")}
                sx={{
                  "&:focus": {
                    color: "#fff",
                    bgcolor: "#000",
                    borderRadius: "99px",
                  },
                }}
              >
                Headsets
              </Button>
              <Button
                className="category_button"
                onClick={() => searchCollectionHandler("earphone")}
                sx={{
                  "&:focus": {
                    color: "#fff",
                    bgcolor: "#000",
                    borderRadius: "99px",
                  },
                }}
              >
                Earphones
              </Button>
              <Button
                className="category_button"
                onClick={() => searchCollectionHandler("monitor")}
                sx={{
                  "&:focus": {
                    color: "#fff",
                    bgcolor: "#000",
                    borderRadius: "99px",
                  },
                }}
              >
                Monitor
              </Button>
              <Button
                className="category_button"
                onClick={() => searchCollectionHandler("laptop")}
                sx={{
                  "&:focus": {
                    color: "#fff",
                    bgcolor: "#000",
                    borderRadius: "99px",
                  },
                }}
              >
                Laptop
              </Button>
              <Button
                className="category_button"
                onClick={() => searchCollectionHandler("etc")}
                sx={{
                  "&:focus": {
                    color: "#fff",
                    bgcolor: "#000",
                    borderRadius: "99px",
                  },
                }}
              >
                Others
              </Button>
            </Stack>
          </Stack>

          <Box className={"fill_search_box"}>
            {/* <Box className={"dropdown"} style={{ borderRadius: "20px" }}>
              <button className="dropbtn">SORT BY:</button>
              <div className="dropdown-content">
                <a onClick={() => searchHandler("mb_point")}>Top</a>
                <a onClick={() => searchHandler("mb_views")}>Most visited</a>
                <a onClick={() => searchHandler("mb_likes")}>Most liked</a>
                <a onClick={() => searchHandler("createdAt")}>New</a>
              </div>
            </Box> */}

            {/* <Box className={"dropup"}>
              <button className="dropbtn">SORT BY:</button>
              <div className="dropup-content">
                <a onClick={() => searchOrderHandler("createdAt")}>New</a>
                <a onClick={() => searchOrderHandler("product_price")}>
                  Price: Low to high
                </a>
                <a onClick={() => searchOrderHandler("product_likes")}>
                  Most Liked
                </a>
                <a onClick={() => searchOrderHandler("product_views")}>
                  Most viewed
                </a>
              </div>
            </Box> */}

            <FormControl style={{ width: "138px", height: "45px" }}>
              <InputLabel id="sort-by-label">SORT BY:</InputLabel>
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
                  }}
                >
                  <SearchIcon />
                </Button>
              </form>
            </Box>
          </Box>
          <Box className="liner"></Box>

          <Stack
            style={{ width: "100%", display: "flex", minHeight: "60px" }}
            flexDirection={"row"}
          >
            <Stack className={"dish_wrapper"}>
              {targetProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;
                return (
                  <Box
                    className="dish_box"
                    key={product._id}
                    onClick={() => chosenProductHandler(product._id)}
                  >
                    <Box
                      className="dish_img"
                      sx={{
                        backgroundImage: `url(${image_path} )`,
                      }}
                    >
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
                    <Stack className={"dish_desc"}>
                      <span className={"dish_title_text"}>
                        {product.product_name}
                      </span>
                      <span className={"dish_desc_text"}>
                        ${product.product_price}
                      </span>
                    </Stack>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
          <Stack
            style={{
              width: "100%",
              display: "flex",
              borderTop: "1px solid #2980b9",
              borderBottom: "1px solid #2980b9",
            }}
            flexDirection={"row"}
            sx={{ mt: "35px" }}
          >
            <Box className={"prev_btn restaurant-prev"}>
              <ArrowBackIosNewIcon
                sx={{ fontSize: 40 }}
                style={{ color: "black" }}
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
              style={{ color: "black" }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
            </Box>
          </Stack>
        </Stack>
      </Container>

      <div className="restaurant_review">
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
                <img src="/community/kazuha.jpeg" className="review_img" />
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
                I am overall satisfied with the functionality of the products,
                they almost do what I want and need for work. But some of the
                products feel kind plasticy and low quality. But the product
                works just fine if you are not obsessed with the build quality
                like me. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Deserunt, explicabo, sint, debitis quasi voluptatibus
                voluptatem aspernatur dicta itaque enim facilis et incidunt
                molestias ea at excepturi maxime dolore. Cupiditate, rem.
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
                <img src="/community/justin.webp" className="review_img" />
              </Box>
            </Box>
            <Stack className="review_right">
              <Box>
                <p className="review_title">They are making changes finally</p>
                <div className={"review_stars"}>
                  <StarIcon style={{ color: "#F2BD57" }} />
                  <StarIcon style={{ color: "#F2BD57" }} />
                  <StarIcon style={{ color: "#F2BD57" }} />
                  <StarIcon style={{ color: "whitesmoke" }} />
                  <StarIcon style={{ color: "whitesmoke" }} />
                </div>
              </Box>
              <Box className="review_text">
                Silent buttons and an 8,000dpi sensor bring Logitech's flagship
                MX Master 3S Wireless Mouse just one or two clicks from
                perfection. Logitech finally serves up office workers a
                mechanical keyboard from its own stable. The wireless,
                low-profile MX Mechanical is a winner, offered in two sizes with
                three switch types.
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
                <img src="/community/guy.webp" className="review_img" />
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
                Smart illumination, fast charging, and recycled materials makes
                for some tempting peripherals. A mechanical keyboard for the
                TikTok generation, Logitech's POP Keys Mechanical Wireless
                Keyboard has a lively look and unique emoji-specific keys,
                though we wish it were a bit easier to type on.
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
                <img src="/community/suzy.webp" className="review_img" />
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
                Qaulity and the design is a not for me I guess. If you love high
                quality and comfortable products maybe you should go for another
                one. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, explicabo, sint, debitis quasi voluptatibus voluptatem
                aspernatur dicta itaque enim facilis et incidunt molestias ea at
                excepturi maxime dolore. Cupiditate, rem.
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

      <Container className={"member_reviews"}>
        {/* <Box className={"category_title"}>Oshxona haqida</Box> */}
        {/* <Stack
          display={"flex"}
          flexDirection={"row"}
          width={"90%"}
          sx={{ mt: "70px" }}
        >
          <Box
            className={"about_left"}
            sx={{
              backgroundImage: `url(${serverApi}/${chosenBrand?.mb_image[0]})`,
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
        </Stack> */}
        {/* 
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
        </Stack> */}
      </Container>
    </div>
  );
}
