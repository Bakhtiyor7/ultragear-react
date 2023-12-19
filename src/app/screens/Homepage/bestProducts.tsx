import { Box, Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTrendProducts } from "./slice";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { retrieveTrendProducts } from "./selector";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTrendProducts: (data: Product[]) => dispatch(setTrendProducts(data)),
});

//** REDUX SELECTOR */
const trendProductsRetriever = createSelector(
  retrieveTrendProducts,
  (trendProducts) => ({
    trendProducts,
  })
);

export function BestProducts() {
  // INITIALIZATIONS
  const history = useHistory();
  const { setTrendProducts } = actionDispatch(useDispatch());
  const { trendProducts } = useSelector(trendProductsRetriever);
  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts({ order: "product_likes", page: 1, limit: 10 })
      .then((data) => {
        setTrendProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // HANDLERS
  const chosenProductHandler = (id: string) => {
    history.push(`/brand/products/${id}`);
  };
  return (
    <div className="top_products_frame">
      <Container>
        <Stack flexDirection={"column"}>
          <Box className="category_title">
            <h1>Bestsellers of the month</h1>
            <Box className="arrow_box">
              <img
                src={"/home/arr_left.svg"}
                className={"swiper-button-prev-top"}
                style={{ cursor: "pointer" }}
              />
              <img
                src={"/home/arr_right.svg"}
                className={"swiper-button-next-top"}
                style={{ cursor: "pointer" }}
              />
            </Box>
          </Box>
          <Swiper
            className={"events_info swiper-wrapper"}
            slidesPerView={4}
            spaceBetween={30}
            navigation={{
              nextEl: ".swiper-button-next-top",
              prevEl: ".swiper-button-prev-top",
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
          >
            {trendProducts.map((product: Product) => {
              const image_path = `${serverApi}/${product.product_images[0]}`;
              return (
                <SwiperSlide className="swiper_box">
                  <Box className="product_box">
                    <Stack className="product_img">
                      <Box
                        className="product_img_holder"
                        sx={{
                          // backgroundImage: `url(${image_path})`,
                          cursor: "pointer",
                        }}
                        onClick={() => chosenProductHandler(product._id)}
                      >
                        <img src={image_path} alt={"product image"}/>
                      </Box>
                    </Stack>

                    <Stack className={"product_desc"}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          width: "100%",
                        }}
                      >
                        <span className={"product_title_text"}>
                          {product.product_name}
                        </span>
                        <span className={"product_price"}>
                          ${product.product_price}
                        </span>
                      </div>
                      <span className="product_collection">
                        {product.product_collection}
                      </span>
                      <span className="product_description">
                        {product.product_description}
                      </span>
                    </Stack>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
}
