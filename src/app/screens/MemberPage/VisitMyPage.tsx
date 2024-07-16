import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SettingsIcon from "@mui/icons-material/Settings";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySettings";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TuiEditor } from "../../components/tuiEditor/TuiEditor";
import { TViewer } from "../../components/tuiEditor/TViewer";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { Member } from "../../../types/user";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "./slice";
import { BoArticle, SearchMemberArticlesObj } from "../../../types/boArticle";
import {
  retrieveChosenMember,
  retrieveChosenSingleBoArticle,
  retrieveChosenMemberBoArticles,
} from "./selector";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";
import { serverApi } from "../../../lib/config";
import { verifiedMemberData } from "../../apiServices/verify";
import ClipLoader from "react-spinners/ClipLoader";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispatch(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: BoArticle) =>
    dispatch(setChosenSingleBoArticle(data)),
});

/** REDUX SELECTOR */
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);
const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);
const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({
    chosenSingleBoArticle,
  })
);

export function VisitMyPage(props: any) {
  /** INITIALIZATIONS **/
  const [loading, setLoading] = useState(true);
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const [value, setValue] = useState("1");
  const [articleRebuild, setArticleRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);
  const [memberArticleSearchObj, setMemberArticleSearchObj] =
    useState<SearchMemberArticlesObj>({ mb_id: "none", page: 1, limit: 4 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!verifiedMemberData) {
          sweetFailureProvider("Please login first!", true, true);
        }

        const communityService = new CommunityApiService();
        const memberService = new MemberApiService();
        await communityService
          .getMemberCommunityArticles(memberArticleSearchObj)
          .then((data) => setChosenMemberBoArticles(data))
          .catch((err) => console.log(err));
        await memberService
          .getChosenMember(verifiedMemberData?._id)
          .then((data) => setChosenMember(data))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [memberArticleSearchObj, articleRebuild, followRebuild]);

  /** HANDLERS **/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    memberArticleSearchObj.page = value;
    setMemberArticleSearchObj({ ...memberArticleSearchObj });
  };

  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("5");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className={"my_page"}>
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
          <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
            <Stack className={"my_page_frame"}>
              <TabContext value={value}>
                <Stack className={"my_page_right"}>
                  <Box className={"order_info_box"}>
                    <Box className="user_menu_top">
                      <a
                        onClick={() => setValue("6")}
                        className={"settings_btn"}
                      >
                        <SettingsIcon />
                      </a>
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                      >
                        <div className={"order_user_img"}>
                          <img
                            src={verifiedMemberData?.mb_image}
                            className={"order_user_avatar"}
                          />
                        </div>
                        <span className={"order_user_name"}>
                          {chosenMember?.mb_nick}
                        </span>

                        <Box
                          display={"flex"}
                          justifyContent={"flex-end"}
                          sx={{ mt: "10px" }}
                        >
                          <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                          >
                            <Tab
                              style={{ flexDirection: "column" }}
                              value={"4"}
                              component={() => (
                                <Button
                                  variant={"contained"}
                                  style={{ background: "gray" }}
                                  onClick={() => setValue("4")}
                                >
                                  Create Article
                                </Button>
                              )}
                            />
                          </TabList>
                        </Box>
                      </Box>
                    </Box>

                    {/* <Box className={"user_media_box"}>
                  <FacebookIcon />
                  <InstagramIcon />
                  <TelegramIcon />
                  <YouTubeIcon />
                </Box> */}
                    <Box className="user_menu_bottom">
                      <span className={"order_user_prof"}>
                        {chosenMember?.mb_type}
                      </span>
                      <p className={"user_desc"}>
                        {chosenMember?.mb_description ??
                          "No additional info provided"}
                      </p>
                      <Box className={"user_media_box"}>
                        <p className={"follows"}>
                          FOLLOWERS: {chosenMember?.mb_subscriber_cnt}{" "}
                        </p>
                        <p className={"follows"}>
                          FOLLOWING: {chosenMember?.mb_follow_cnt}{" "}
                        </p>
                      </Box>
                    </Box>
                  </Box>
                </Stack>
                <Stack className={"my_page_left"}>
                  <Box sx={{ width: "100%", borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      centered
                      sx={{
                        "& button": { borderRadius: "2" },
                        "& button:hover": { backgroundColor: "#fff" },
                      }}
                    >
                      <Tab
                        value={"1"}
                        label="My Articles"
                        onClick={() => setValue("1")}
                      />
                      <Tab
                        value={"2"}
                        label="Follower"
                        onClick={() => setValue("2")}
                      />
                      <Tab
                        value={"3"}
                        label="Following"
                        onClick={() => setValue("3")}
                      />
                    </Tabs>
                  </Box>
                  <Box display={"flex"} flexDirection={"column"}>
                    <TabPanel value={"1"}>
                      <Box className={"menu_content"}>
                        <MemberPosts
                          chosenMemberBoArticles={chosenMemberBoArticles}
                          renderChosenArticleHandler={
                            renderChosenArticleHandler
                          }
                          setArticleRebuild={setArticleRebuild}
                        />
                        <Stack
                          sx={{ my: "40px" }}
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Box className={"bottom_box"}>
                            <Pagination
                              count={
                                memberArticleSearchObj.page >= 3
                                  ? memberArticleSearchObj.page + 1
                                  : 3
                              }
                              page={memberArticleSearchObj.page}
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
                              onChange={handlePaginationChange}
                            />
                          </Box>
                        </Stack>
                      </Box>
                    </TabPanel>

                    <TabPanel value={"2"}>
                      <Box className={"menu_content"}>
                        <MemberFollowers
                          actions_enabled={true}
                          followRebuild={followRebuild}
                          setFollowRebuild={setFollowRebuild}
                          mb_id={verifiedMemberData?._id}
                        />
                      </Box>
                    </TabPanel>

                    <TabPanel value={"3"}>
                      <Box className={"menu_content"}>
                        <MemberFollowing
                          actions_enabled={true}
                          mb_id={verifiedMemberData?._id}
                          setFollowRebuild={setFollowRebuild}
                          followRebuild={followRebuild}
                        />
                      </Box>
                    </TabPanel>

                    <TabPanel value={"4"}>
                      <Box className={"menu_name"}>CREATE ARTICLE</Box>
                      <Box className={"write_content"}>
                        <TuiEditor
                          setValue={setValue}
                          setArticleRebuild={setArticleRebuild}
                        />
                      </Box>
                    </TabPanel>

                    <TabPanel value={"5"}>
                      <Box className={"menu_name"}>Chosen Article</Box>
                      <Box className={"menu_content"}>
                        <TViewer
                          chosenSingleBoArticle={chosenSingleBoArticle}
                        />
                      </Box>
                    </TabPanel>

                    <TabPanel value={"6"}>
                      <Box className={"menu_name"}>
                        Change Personal Information
                      </Box>
                      <Box className={"menu_content"}>
                        <MySettings />
                      </Box>
                    </TabPanel>
                  </Box>
                </Stack>
              </TabContext>
            </Stack>
          </Container>
        </>
      )}
    </div>
  );
}
