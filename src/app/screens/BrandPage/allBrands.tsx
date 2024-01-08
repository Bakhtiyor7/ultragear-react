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
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import ClipLoader from "react-spinners/ClipLoader";
import BrandListContainer from "../../components/brandPage/brand_list";

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
  const [loading, setLoading] = useState(true);

  const refs: any = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const brandService = new BrandApiService();
        await brandService
          .getBrands(targetSearchObject)
          .then((data) => setTargetBrands(data))
          .catch((err) => console.log(err));

        setLoading(false);
      } catch (error) {
        console.log("Error loading data", error);
        setLoading(false);
      }
    };
    fetchData();
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
                <h1>Featured Brands</h1>
              </Box>

              <Box className="head_info_box">
                <Box className="category_box"></Box>
              </Box>
            </Stack>
            <Stack>
              <Tabs
                value={targetSearchObject.order}
                onChange={(event, newValue) => searchHandler(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                className="category_holder"
                TabIndicatorProps={{
                  style: { display: "none" },
                }}
              >
                <Tab
                  label="Top"
                  value="mb_point"
                  sx={{
                    "&:focus": {
                      color: "#fff",
                      bgcolor: "#000",
                      borderRadius: "99px",
                    },
                    "&.Mui-selected": {
                      color: "#fff",
                      bgcolor: "#000",
                      borderRadius: "99px",
                    },
                  }}
                  className="filter_button"
                />
                <Tab
                  label="Most Visited"
                  value="mb_views"
                  sx={{
                    "&:focus": {
                      color: "#fff",
                      bgcolor: "#000",
                      borderRadius: "99px",
                    },
                    "&.Mui-selected": {
                      color: "#fff",
                      bgcolor: "#000",
                      borderRadius: "99px",
                    },
                  }}
                  className="filter_button"
                />
                <Tab
                  label="Most Liked"
                  value="mb_likes"
                  sx={{
                    "&:focus": {
                      color: "#fff",
                      bgcolor: "#000",
                      borderRadius: "99px",
                    },
                    "&.Mui-selected": {
                      color: "#fff",
                      bgcolor: "#000",
                      borderRadius: "99px",
                    },
                  }}
                  className="filter_button"
                />
                <Tab
                  label="New"
                  value="createdAt"
                  sx={{
                    "&:focus": {
                      color: "white",
                      backgroundColor: "#000",
                      borderRadius: "99px",
                    },
                    "&.Mui-selected": {
                      color: "#fff",
                      bgcolor: "#000",
                      borderRadius: "99px",
                    },
                  }}
                  className="filter_button"
                />
              </Tabs>
              <Box className={"fill_search_box"}>
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
              <BrandListContainer
                targetBrands={targetBrands}
                chosenBrandHandler={chosenBrandHandler}
                targetLikeHandler={targetLikeHandler}
                loading={loading}
                handlePaginationChange={handlePaginationChange}
                targetSearchObject={targetSearchObject}
              />
            </Stack>
          </Container>
        </>
      )}
    </div>
  );
}
