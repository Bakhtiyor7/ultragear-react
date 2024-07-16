import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import React, { useEffect, useState } from "react";
import "../../../css/community.css";
import { BoArticle, SearchArticlesObj } from "../../../types/boArticle";
import CommunityApiService from "../../apiServices/communityApiService";
import { TargetArticles } from "./targetArticles";
//REDUX
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { createSelector } from "reselect";
import { retrieveTargetBoArticles } from "../../screens/CommunityPage/selector";
import { setTargetBoArticles } from "../../screens/CommunityPage/slice";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) =>
    dispatch(setTargetBoArticles(data)),
});

/** REDUX SELECTOR */
const targetBoArticlesRetriever = createSelector(
  retrieveTargetBoArticles,
  (targetBoArticles) => ({
    targetBoArticles,
  }),
);
export function CommunityPage(props: any) {
  /** INITIALIZATIONS **/
  const { setTargetBoArticles } = actionDispatch(useDispatch());
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever);

  const [value, setValue] = React.useState("1");
  const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>(
    { bo_id: "all", page: 1, limit: 6 },
  );
  const [articleRebuild, setArticleRebuild] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const communityService = new CommunityApiService();
        await communityService
          .getTargetArticles(searchArticlesObj)
          .then((data) => setTargetBoArticles(data))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchArticlesObj, articleRebuild]);

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    searchArticlesObj.page = 1;
    switch (newValue) {
      case "1":
        searchArticlesObj.bo_id = "all";
        break;
      case "2":
        searchArticlesObj.bo_id = "celebrity";
        break;
      case "3":
        searchArticlesObj.bo_id = "evaluation";
        break;
      case "4":
        searchArticlesObj.bo_id = "story";
        break;
    }
    setSearchArticlesObj({ ...searchArticlesObj });
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    searchArticlesObj.page = value;
    setSearchArticlesObj({ ...searchArticlesObj });
  };

  return (
    <div className={"community_page"}>
      <div className={"community_frame"}>
        <Container sx={{ mt: "50px", mb: "50px", background: "#fff" }}>
          <Stack>
            <Stack className={"community_all_frame"} inputMode={"text"}>
              <TabContext value={value}>
                <Box className={"article_tabs"}>
                  <Box>
                    <Tabs
                      value={value}
                      style={{}}
                      TabIndicatorProps={{
                        style: { display: "none" },
                      }}
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        label="All articles"
                        value="1"
                        sx={{
                          "&:focus": {
                            color: "#fff",
                            bgcolor: "#000",
                            borderRadius: "99px",
                          },
                          "&.MuiTab-textColorPrimary.Mui-selected": {
                            color: "#fff",
                            bgcolor: "#000",
                            borderRadius: "99px",
                          },
                        }}
                      />
                      <Tab
                        label="Popular"
                        value="2"
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
                      />
                      <Tab
                        label="Brand review"
                        value="3"
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
                      />
                      <Tab
                        label="Stories"
                        value="4"
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
                          transform: "capitalize",
                        }}
                      />
                    </Tabs>
                  </Box>
                </Box>

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
                    <Box className={"article_main"}>
                      <TabPanel value="1">
                        <TargetArticles
                          targetBoArticles={targetBoArticles}
                          setArticleRebuild={setArticleRebuild}
                        />
                      </TabPanel>
                      <TabPanel value="2">
                        <TargetArticles
                          targetBoArticles={targetBoArticles}
                          setArticleRebuild={setArticleRebuild}
                        />
                      </TabPanel>
                      <TabPanel value="3">
                        <TargetArticles
                          targetBoArticles={targetBoArticles}
                          setArticleRebuild={setArticleRebuild}
                        />
                      </TabPanel>
                      <TabPanel value="4">
                        <TargetArticles
                          targetBoArticles={targetBoArticles}
                          setArticleRebuild={setArticleRebuild}
                        />
                      </TabPanel>
                    </Box>

                    <Box className={"article_bott"}>
                      <Pagination
                        count={
                          searchArticlesObj.page >= 3
                            ? searchArticlesObj.page + 1
                            : 3
                        }
                        page={searchArticlesObj.page}
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
                    </Box>
                  </>
                )}
              </TabContext>
            </Stack>
            {/* <CommunityChats /> */}
          </Stack>
        </Container>
      </div>
    </div>
  );
}
