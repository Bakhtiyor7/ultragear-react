import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Pagination,
  PaginationItem,
  Stack,
  Tabs,
} from "@mui/material";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { TViewer } from "../../components/tuiEditor/TViewer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
import { useHistory } from "react-router-dom";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import FollowApiService from "../../apiServices/followApiService";
import { Definer } from "../../../lib/Definer";
import { verifiedMemberData } from "../../apiServices/verify";
import { serverApi } from "../../../lib/config";
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

export function VisitOtherPage(props: any) {
  /** INITIALIZATIONS **/
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { chosen_mb_id, chosen_art_id } = props;
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
  const [memberArticleSearchObj, setMemberArticleSearchObj] =
    useState<SearchMemberArticlesObj>({
      mb_id: chosen_mb_id,
      page: 1,
      limit: 4,
    });
  const [articleRebuild, setArticleRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (chosen_mb_id === verifiedMemberData?._id) {
          history.push("/member-page"); // agar o'zimiz bo'lsak my page ga jo'nat
        }

        const communityService = new CommunityApiService();
        if (chosen_art_id) {
          await communityService
            .getChosenArticle(chosen_art_id)
            .then((data) => {
              setChosenSingleBoArticle(data);
              setValue("4");
            })
            .catch((err) => console.log(err));
        }
        await communityService
          .getMemberCommunityArticles(memberArticleSearchObj)
          .then((data) => setChosenMemberBoArticles(data))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [memberArticleSearchObj, chosen_mb_id, articleRebuild]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (chosen_mb_id === verifiedMemberData?._id) {
          history.push("/member-page");
        }

        const memberService = new MemberApiService();
        await memberService
          .getChosenMember(memberArticleSearchObj.mb_id)
          .then((data) => setChosenMember(data))
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [verifiedMemberData, chosen_mb_id, followRebuild]);

  /** HANDLERS **/
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const handlePaginationChange = (event: any, value: number) => {
    memberArticleSearchObj.page = value;
    setMemberArticleSearchObj({ ...memberArticleSearchObj });
  };

  const subscribeHandler = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.subscribe(e.target.value);

      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const unsubscribeHandler = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const followService = new FollowApiService();
      await followService.unsubscribe(e.target.value);

      await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
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
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                      >
                        <div className={"order_user_img"}>
                          <img
                            src={
                              chosenMember?.mb_image
                                ? `${serverApi}/${chosenMember?.mb_image}`
                                : "/auth/default_user.svg"
                            }
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
                            {chosenMember?.me_followed &&
                            chosenMember.me_followed[0]?.my_following ? (
                              <Tab
                                style={{ flexDirection: "column" }}
                                value={"4"}
                                component={() => (
                                  <Button
                                    value={chosenMember?._id}
                                    variant={"contained"}
                                    style={{ backgroundColor: "#f70909b8" }}
                                    onClick={unsubscribeHandler}
                                  >
                                    Unfollow
                                  </Button>
                                )}
                              />
                            ) : (
                              <Tab
                                style={{ flexDirection: "column" }}
                                value={"4"}
                                component={() => (
                                  <Button
                                    value={chosenMember?._id}
                                    variant={"contained"}
                                    style={{ backgroundColor: "#30945e" }}
                                    onClick={subscribeHandler}
                                  >
                                    FOLLOW
                                  </Button>
                                )}
                              />
                            )}
                          </TabList>
                        </Box>
                      </Box>
                      {/* <Box className={"user_media_box"}>
                  <FacebookIcon />
                  <InstagramIcon />
                  <TelegramIcon />
                  <YouTubeIcon />
                </Box> */}
                    </Box>

                    <Box className="user_menu_bottom">
                      <span className={"order_user_prof"}>
                        {chosenMember?.mb_type}
                      </span>
                      <p className={"user_desc"}>
                        {chosenMember?.mb_description ??
                          "No additonal info provided"}
                      </p>
                      <Box className={"user_media_box"}>
                        <p className={"follows"}>
                          FOLLOWERS: {chosenMember?.mb_subscriber_cnt}{" "}
                        </p>
                        <p className={"follows"}>
                          FOLLOWING: {chosenMember?.mb_follow_cnt}
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
                        label="Articles"
                        onClick={() => setValue("1")}
                      />
                      <Tab
                        value={"2"}
                        label="Followers"
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
                          actions_enabled={false}
                          followRebuild={followRebuild}
                          setFollowRebuild={setFollowRebuild}
                          mb_id={chosen_mb_id}
                        />
                      </Box>
                    </TabPanel>
                    <TabPanel value={"3"}>
                      <Box className={"menu_content"}>
                        <MemberFollowing
                          actions_enabled={false}
                          followRebuild={followRebuild}
                          setFollowRebuild={setFollowRebuild}
                          mb_id={chosen_mb_id}
                        />
                      </Box>
                    </TabPanel>

                    <TabPanel value={"4"}>
                      <Box className={"menu_content"}>
                        <TViewer
                          chosenSingleBoArticle={chosenSingleBoArticle}
                        />
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
