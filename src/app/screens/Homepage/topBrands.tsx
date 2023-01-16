import { Box, Container, Stack } from "@mui/material";
import React, { useRef } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow, IconButton } from "@mui/joy";
import { Favorite, RefreshSharp, Visibility } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
// OTHERS
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import { useHistory } from "react-router-dom";
//REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopBrands } from "./selector";
import { Brand } from "../../../types/user";
import { verifiedMemberData } from "../../apiServices/verify";

//** REDUX SELECTOR */
const topBrandsRetriever = createSelector(retrieveTopBrands, (topBrands) => ({
  topBrands,
}));

export function TopBrands() {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { topBrands } = useSelector(topBrandsRetriever);
  console.log("topBrands:", topBrands);
  const refs: any = useRef([]);

  /** HANDLERS */
  const chosenBrandHandler = (id: string) => {
    history.push(`/brand/${id}`);
  };

  const targetLikeTop = async (e: any, id: string) => {
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
  };
  return (
    <div className="top_brand_frame">
      <Container>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
        >
          <Box className="category_title">Our Featured Top Brands</Box>
          <Stack
            sx={{ mt: "43px" }}
            flexDirection={"row"}
            justifyContent={"space-between"}
            m={"16px"}
          >
            {topBrands.map((ele: Brand) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return (
                <CssVarsProvider key={ele._id}>
                  {" "}
                  <Card
                    onClick={() => chosenBrandHandler(ele._id)}
                    variant="outlined"
                    sx={{
                      minWidth: 320,
                      width: 320,
                      mr: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio="1">
                        <img
                          src={image_path}
                          loading="lazy"
                          alt="brand_image"
                        />
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
                        {ele.mb_subscriber_cnt} subscribers
                      </Typography>
                    </CardOverflow>
                  </Card>
                </CssVarsProvider>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
