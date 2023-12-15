import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import {
  AspectRatio,
  Card,
  CardOverflow,
  CssVarsProvider,
  Divider,
  IconButton,
  Typography,
} from "@mui/joy";
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { serverApi } from "../../../lib/config";
//REDUX
import { Dispatch } from "@reduxjs/toolkit";
import assert from "assert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSelector } from "reselect";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { SearchObj } from "../../../types/others";
import { Brand } from "../../../types/user";
import BrandApiService from "../../apiServices/brandApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { verifiedMemberData } from "../../apiServices/verify";
import { retrieveTargetBrands } from "./selector";
import { setTargetBrands } from "./slice";
import Favorite from "@mui/icons-material/Favorite";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetBrands: (data: Brand[]) => dispatch(setTargetBrands(data)),
});

/** REDUX SELECTOR */
const targetBrandsRetriever = createSelector(
  retrieveTargetBrands,
  (targetBrands) => ({
    targetBrands,
  })
);

export function AllBrands() {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { setTargetBrands } = actionDispatch(useDispatch());
  const { targetBrands } = useSelector(targetBrandsRetriever);

  const [targetSearchObject, setTargetSearchObject] = useState<SearchObj>({
    page: 1,
    limit: 8,
    order: "mb_point",
  });

  const refs: any = useRef([]);

  useEffect(() => {
    // TODO: retrieve target brands data
    const brandService = new BrandApiService();
    brandService
      .getBrands(targetSearchObject)
      .then((data) => setTargetBrands(data))
      .catch((err) => console.log(err));
  }, [targetSearchObject]);

  /** HANDLERS */
  const chosenBrandHandler = (id: string) => {
    history.push(`/brand/${id}`);
  };
  const searchHandler = (category: string) => {
    targetSearchObject.page = 1;
    targetSearchObject.order = category;
    setTargetSearchObject({ ...targetSearchObject });
  };
  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObject.page = value;
    setTargetSearchObject({ ...targetSearchObject });
  };

  const targetLikeHandler = async (e: any, id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "member",
        });
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }

      await sweetTopSmallSuccessAlert("success", 700, false);
    } catch (err: any) {
      console.log("targetLikeTop, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  }; //test

  return (
    <div className="all_brand">
      <Container>
        <Stack className="head_information_brand">
          <img src="/home/rectangle.png" alt="" className="rectangle" />
          <Box className="header_title">
            <h1>Featured Brands</h1>
          </Box>

          <Box className="head_info_box">
            <Box className="category_box"></Box>
          </Box>
        </Stack>
        <Stack>
          <Stack className="category_holder">
            <Button
              className="category_button"
              onClick={() => searchHandler("mb_point")}
              sx={{
                "&:focus": {
                  color: "#fff",
                  bgcolor: "#000",
                  borderRadius: "99px",
                },
              }}
            >
              Top
            </Button>
            <Button
              className="category_button"
              onClick={() => searchHandler("mb_views")}
              sx={{
                "&:focus": {
                  color: "#fff",
                  bgcolor: "#000",
                  borderRadius: "99px",
                },
              }}
            >
              Most Visited
            </Button>
            <Button
              className="category_button"
              onClick={() => searchHandler("mb_likes")}
              sx={{
                "&:focus": {
                  color: "#fff",
                  bgcolor: "#000",
                  borderRadius: "99px",
                },
              }}
            >
              Most Liked
            </Button>
            <Button
              className="category_button"
              onClick={() => searchHandler("createdAt")}
              sx={{
                "&:focus": {
                  color: "white",
                  backgroundColor: "#000",
                  borderRadius: "99px",
                },
              }}
            >
              New
            </Button>
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
          <Stack className={"all_res_box"}>
            <CssVarsProvider>
              {targetBrands.map((ele: Brand) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <Card
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
              })}
            </CssVarsProvider>
          </Stack>

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
      </Container>
    </div>
  );
}
