// BrandListContainer.tsx
import React from "react";
import {
  Stack,
  CssVarsProvider,
  Card,
  Typography,
  Divider,
  IconButton,
  Box,
  CardOverflow,
  AspectRatio,
} from "@mui/joy";
import { serverApi } from "../../../lib/config";
import Favorite from "@mui/icons-material/Favorite";
import ClipLoader from "react-spinners/ClipLoader";
import { SearchObj } from "../../../types/others";
import { Brand } from "../../../types/user";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface BrandListContainerProps {
  targetBrands: Brand[];
  chosenBrandHandler: (id: string) => void;
  targetLikeHandler: (e: any, id: string) => void;
  loading: boolean;
  handlePaginationChange: (event: any, value: number) => void;
  targetSearchObject: SearchObj;
}

const BrandListContainer: React.FC<BrandListContainerProps> = ({
  targetBrands,
  chosenBrandHandler,
  targetLikeHandler,
  loading,
  handlePaginationChange,
  targetSearchObject,
}) => {
  return (
    <div className="all_brand_list">
      <Stack className={"all_brand_box"}>
        <CssVarsProvider>
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
            targetBrands.map((ele: Brand) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return (
                <Card
                  key={ele._id}
                  onClick={() => chosenBrandHandler(ele._id)}
                  variant="outlined"
                  sx={{
                    minWidth: 290,
                    mr: "30px",
                    cursor: "pointer",
                    mb: "30px",
                  }}
                >
                  <CardOverflow>
                    <AspectRatio ratio="1">
                      <Box className="brand_image_wrapper">
                        <img
                          src={image_path}
                          loading="lazy"
                          alt="brand_image"
                        />
                      </Box>
                    </AspectRatio>
                  </CardOverflow>
                  <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                    {ele.mb_nick}
                  </Typography>

                  <Divider />
                  <CardOverflow
                    variant="soft"
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      py: 1.5,
                      px: "var(--Card-padding)",
                      bgcolor: "background.level1",
                    }}
                  >
                    <Typography
                      level="body3"
                      sx={{ fontWeight: "md", color: "text.secondary" }}
                    >
                      {ele.mb_views} views
                    </Typography>
                    <Divider orientation="vertical" />
                    <Typography
                      level="body3"
                      sx={{ fontWeight: "md", color: "text.secondary" }}
                    >
                      {ele.mb_likes} likes
                    </Typography>
                    <IconButton
                      aria-label="Like minimal photography"
                      size="sm"
                      variant="solid"
                      color="neutral"
                      sx={{
                        position: "absolute",
                        zIndex: 2,
                        borderRadius: "50%",
                        right: "1rem",
                        bottom: "2.5rem",
                        transform: "translateY(50%)",
                        color: "rgba(0,0,0,.4)",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Favorite
                        onClick={(e) => targetLikeHandler(e, ele._id)}
                        style={{
                          fill:
                            ele?.me_liked && ele?.me_liked[0]?.my_favorite
                              ? "#00FFFF"
                              : "white",
                        }}
                      />
                    </IconButton>
                  </CardOverflow>
                </Card>
              );
            })
          )}
        </CssVarsProvider>
        <Stack className={"bottom_box"}>
          <Pagination
            count={
              targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
            }
            page={targetSearchObject.page}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBackIcon,
                  next: ArrowForwardIcon,
                }}
                {...item}
                color={"primary"}
              />
            )}
            onChange={handlePaginationChange}
          />
        </Stack>
      </Stack>
    </div>
  );
};

export default BrandListContainer;
