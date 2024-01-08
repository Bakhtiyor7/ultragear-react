// ProductList.js

import React from "react";
import { Box, Button, Badge, Checkbox, Stack } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import StarIcon from "@mui/icons-material";
import { Product } from "../../../types/product";
import { serverApi } from "../../../lib/config";

interface ProductListInterface {
  products: Product[];
  chosenProductHandler: (id: string) => void;
  onAdd: (product: Product) => void;
  targetLikeProduct: (e: any) => void;
}

const ProductList: React.FC<ProductListInterface> = ({
  products,
  chosenProductHandler,
  onAdd,
  targetLikeProduct,
}) => {
  return (
    <Stack className={"products_wrapper"}>
      {products.map((product) => {
        const image_path = `${serverApi}/${product.product_images[0]}`;
        return (
          <Box
            className="product_box"
            key={product._id}
            onClick={() => chosenProductHandler(product._id)}
          >
            <Box className="product_img">
              <Box
                className="product_img_holder"
                sx={{
                  // backgroundImage: `url(${image_path})`,
                  cursor: "pointer",
                }}
                onClick={() => chosenProductHandler(product._id)}
              >
                <img src={image_path} alt={"product image"} />
              </Box>
              <Button
                className={"like_view_btn"}
                style={{ left: "36px" }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Badge badgeContent={product.product_likes} color={"primary"}>
                  <Checkbox
                    icon={<FavoriteBorder style={{ color: "white" }} />}
                    id={product._id}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    onClick={targetLikeProduct}
                    checked={
                      !!(product?.me_liked && product?.me_liked[0]?.my_favorite)
                    }
                  />
                </Badge>
              </Button>
              <Button
                className={"view_btn"}
                onClick={(e) => {
                  onAdd(product);
                  e.stopPropagation();
                }}
              >
                <img
                  src={"/icons/shopping_cart.svg"}
                  style={{ display: "flex" }}
                  alt={"cart_icon"}
                />
              </Button>
              <Button className={"like_view_btn"} style={{ right: "36px" }}>
                <Badge badgeContent={product.product_views} color="primary">
                  <Checkbox
                    icon={<RemoveRedEyeIcon style={{ color: "white" }} />}
                  />
                </Badge>
              </Button>
            </Box>
            <Stack className={"product_desc"}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <span className="product_collection">
                  {product.product_collection}
                </span>
                <span className={"product_desc_text"}>
                  ${product.product_price}
                </span>
              </div>
              <span className={"porduct_title_text"}>
                {product.product_name}
              </span>
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
};

export default ProductList;
