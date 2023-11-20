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
      <Container sx={{ mb: "45px" }}>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
          gap="16px"
        >
          <Box className="top_brands_title">Featured Top Brands</Box>

          <Stack className="brands_frame">
            {topBrands[0] && (
              <>
                <Box
                  className="brands_left"
                  onClick={() => chosenBrandHandler(topBrands[0]._id)}
                  sx={{ cursor: "pointer" }}
                >
                  <div style={{ width: "215px", height: "200px" }}>
                    <img
                      src={`${serverApi}/${topBrands[0].mb_image}`}
                      alt={topBrands[0].mb_nick}
                    />
                  </div>
                </Box>
                <Stack className="brands_right">
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: "30px",
                    }}
                  >
                    <Box
                      className="brands_right_top"
                      onClick={() => chosenBrandHandler(topBrands[1]._id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <div style={{ width: "215px", height: "200px" }}>
                        {" "}
                        <img
                          src={`${serverApi}/${topBrands[1].mb_image}`}
                          alt={topBrands[1].mb_nick}
                        />
                      </div>
                    </Box>
                    <Box
                      className="brands_right_top"
                      onClick={() => chosenBrandHandler(topBrands[2]._id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <div style={{ width: "215px", height: "200px" }}>
                        <img
                          src={`${serverApi}/${topBrands[2].mb_image}`}
                          alt={topBrands[2].mb_nick}
                        />
                      </div>
                    </Box>
                  </Stack>
                  <Box
                    className="brands_right_bottom"
                    onClick={() => chosenBrandHandler(topBrands[3]._id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <div style={{ width: "215px", height: "200px" }}>
                      <img
                        src={`${serverApi}/${topBrands[3].mb_image}`}
                        alt={topBrands[3].mb_nick}
                      />
                    </div>
                  </Box>
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
