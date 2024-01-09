import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Link, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import assert from "assert";
import moment from "moment";
import { Definer } from "../../../lib/Definer";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { BoArticle } from "../../../types/boArticle";
import MemberApiService from "../../apiServices/memberApiService";
import { verifiedMemberData } from "../../apiServices/verify";

export function TargetArticles(props: any) {
  const { setArticleRebuild } = props;
  //  HANDLERS
  const targetLikeHandler = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService();
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "community",
      });
      assert.ok(like_result, Definer.general_err1);
      await sweetTopSmallSuccessAlert("success", 700, false);
      setArticleRebuild(new Date());
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      gap={5}
      className={"all_articles_wrapper"}
    >
      {props.targetBoArticles?.map((article: BoArticle) => {
        const art_image_url = article?.art_image
          ? `${serverApi}/${article.art_image}`
          : "/community/article_default.jpg";
        // const width = `clamp(18rem, calc(20rem + 2vw), 20rem`;
        return (
          <Box
            key={article?._id}
            // width={width}
            boxSizing="border-box"
          >
            <Link
              className={"all_article_box"}
              sx={{ textDecoration: "none" }}
              href={`/member-page/other?mb_id=${article.mb_id}&art_id=${article._id}`}
            >
              <Box className="article_header">
                <img src={`${art_image_url}`} alt="article image" />
              </Box>
              <Box className={"all_article_container"}>
                <span className={"all_article_title"}>{article?.bo_id}</span>
                <span className={"all_article_desc"}>
                  {article?.art_subject}
                </span>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "15px",
                    alignSelf: "flex-start",
                  }}
                ></Box>
                <Box>
                  <Box
                    className={"article_share"}
                    style={{ alignSelf: "flex-start" }}
                    sx={{ mb: "10px" }}
                  >
                    <Box
                      className={"article_share_main"}
                      style={{
                        color: "#000",
                        display: "flex",
                        alignItems: "center",
                        marginRight: "50px",
                      }}
                    >
                      <Checkbox
                        sx={{ color: "black" }}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite style={{ color: "red" }} />}
                        id={article?._id}
                        /**@ts-ignore */
                        onClick={targetLikeHandler}
                        checked={
                          article?.me_liked && article?.me_liked[0]?.my_favorite
                            ? true
                            : false
                        }
                      />
                      <span style={{ marginRight: "15px" }}>
                        {article?.art_likes}
                      </span>
                      <RemoveRedEyeIcon />
                      <span style={{ marginLeft: "8px" }}>
                        {article?.art_views}
                      </span>
                    </Box>
                  </Box>
                </Box>
                <Box alignItems={"center"} display={"flex"} gap={"10px"}>
                  <img
                    src={
                      article?.member_data?.mb_image
                        ? `${serverApi}/${article.member_data.mb_image}`
                        : "/auth/default_avatar.jpg"
                    }
                    alt={"member image"}
                    width={"35px"}
                    style={{ borderRadius: "50%", backgroundSize: "cover" }}
                    className={"author_img"}
                  />
                  <div className="user_name_container">
                    <span className={"all_article_author_user"}>
                      {article?.member_data.mb_nick}
                    </span>
                    <span className="written_date">
                      {moment(article?.createdAt).fromNow()}
                    </span>
                  </div>
                </Box>
              </Box>
            </Link>
          </Box>
        );
      })}
    </Stack>
  );
}
