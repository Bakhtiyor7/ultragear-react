import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  AspectRatio,
  Card,
  CardOverflow,
  CssVarsProvider,
  IconButton,
  Link,
  Typography,
} from "@mui/joy";
import Favorite from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CallIcon from "@mui/icons-material/Call";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTargetRestaurants } from "../../screens/RestaurantPage/selector";
import { Restaurant } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetRestaurants } from "../../screens/RestaurantPage/slice";

const order_list = Array.from(Array(8).keys());

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetRestaurants: (data: Restaurant[]) =>
    dispatch(setTargetRestaurants(data)),
});

//** REDUX SELECTOR */
const targetRestaurantsRetriever = createSelector(
  retrieveTargetRestaurants,
  (targetRestaurants) => ({
    targetRestaurants,
  })
);

export function AllRestaurants() {
  /** INITIALIZATIONS */
  const { setTargetRestaurants } = actionDispatch(useDispatch());
  const { targetRestaurants } = useSelector(targetRestaurantsRetriever);

  useEffect(() => {
    // TODO: retrieve target restaurants data
  }, []);

  return (
    <div className="all_restaurant">
      <Container>
        <Stack>
          <Box className={"fill_search_box"}>
            <Box className={"fil_box"}>
              <a>Zo'r</a>
              <a>Mashhur</a>
              <a>Trenddagi</a>
              <a>Yangi</a>
            </Box>
            <Box className={"search_big_box"}>
              <form className={"search_form"} action={""} method={""}>
                <input
                  type={"search"}
                  className={"searchInput"}
                  name={"resSearch"}
                  placeholder={"Qidiruv"}
                />
                <Button
                  className={"button_search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </form>
            </Box>
          </Box>
          <Stack className={"all_res_box"}>
            <CssVarsProvider>
              {order_list.map((ele) => {
                return (
                  <Card
                    variant="outlined"
                    sx={{
                      minHeight: 410,
                      minWidth: 290,
                      mx: "17px",
                      my: "20px",
                    }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio="1">
                        <img src={"/restaurant/burak.jpeg"} />
                      </AspectRatio>
                      <IconButton
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="danger"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: 0,
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,.4)",
                        }}
                      >
                        <Favorite /* @ts-ignore */ style={{ color: "white" }} />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
                      Texas De Brazil
                    </Typography>
                    <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                      <Link
                        href=""
                        startDecorator={<LocationOnRoundedIcon />}
                        textColor="neutral.700"
                      >
                        Tashkent Yunusabad
                      </Link>
                    </Typography>
                    <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                      <Link
                        href=""
                        startDecorator={<CallIcon />}
                        textColor="neutral.700"
                      >
                        998902669955
                      </Link>
                    </Typography>
                    <CardOverflow
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card--padding",
                        borderTop: "1px solid",
                        borderColor: "neutral.outlineBorder",
                        bgcolor: "background.level1",
                      }}
                    >
                      <Typography
                        level="body3"
                        sx={{
                          fontweight: "md",
                          color: "text.secondary",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        100{""}
                        <VisibilityIcon
                          sx={{ fontSize: 20, marginLeft: "5px" }}
                        />
                      </Typography>
                      <Box sx={{ width: 2, bgcolor: "divider" }} />
                      <Typography
                        level="body3"
                        sx={{
                          fontweight: "md",
                          color: "text.secondary",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <div>50</div>
                        <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>

          <Stack className={"bottom_box"}>
            <img className={"line_img"} src={"/restaurant/line.svg"} />
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
            />
            <img className={"line_img_two"} src={"/restaurant/line_two.svg"} />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
