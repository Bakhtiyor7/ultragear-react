import React, { useState } from "react";
import { Box, Button, Container, Link, Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
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
    <Stack display={"flex"} alignItems={"center"}>
      {props.targetBoArticles?.map((article: BoArticle) => {
        const art_image_url = article?.art_image
          ? `${serverApi}/${article.art_image}`
          : "/community/default_article.png";
        return (
          <Stack className="article_box">
            <Box display={"flex"} flexDirection={"row"} sx={{ mb: "20px" }}>
              <img
                src={
                  article?.member_data?.mb_image
                    ? `${serverApi}/${article.member_data.mb_image}`
                    : "/auth/default_user.svg"
                }
                className="author_image"
              />
              <p className="article_author">{article?.member_data.mb_nick}</p>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
              sx={{ mb: "10px" }}
            >
              <span className="article_title"> {article?.bo_id}</span>
              <span className="article_desc">{article?.art_subject}</span>
            </Box>
            <Button
              href={`/member-page/other?mb_id=${article.mb_id}&art_id=${article._id}`}
              variant="outlined"
              size="large"
              style={{ color: "#393E46", borderColor: "gray" }}
            >
              READ MORE
            </Button>
            <Box
              className={"article_share"}
              style={{ height: "auto" }}
              sx={{ mb: "10px" }}
            >
              <Box
                className={"article_share_main"}
                style={{
                  color: "rgb(255, 255, 255)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "gray" }}></span>
                <Checkbox
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
                <span style={{ marginRight: "18px", color: "#000" }}>
                  {article?.art_likes}
                </span>
                <span style={{ color: "gray" }}> </span>
                <RemoveRedEyeIcon style={{ color: "#000" }} />
                <span style={{ marginLeft: "15px", color: "#000" }}>
                  {article?.art_views}
                </span>
              </Box>
            </Box>
          </Stack>
        );
      })}
    </Stack>
  );
}
