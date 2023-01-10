import { Box, Container, Stack } from "@mui/material";
import React from "react";

export function Footer() {
  return (
    <div className="footer_config">
      <Container>
        <Stack className="main_footer_container">
          <Stack flexDirection={"row"} style={{ height: "242px" }}>
            <Stack className="info" flexDirection={"column"}>
              <Box className="footer_title">ULTRAGEAR</Box>
              <Box className="main_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor Sed ut perspiciatis unde omnis iste
              </Box>
              <Stack className="contact_links">
                <Box>
                  <img src={"/icons/facebook.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/twitter.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/instagram.svg"} />
                </Box>
                <Box>
                  <img src={"/icons/youtube.svg"} />
                </Box>
              </Stack>
            </Stack>
            <Stack className="parts">
              <Box className="part_subject">Sections</Box>
              <Box className="divider"></Box>
              <Box className="targets">Homepage Brands Communtiy, Help</Box>
            </Stack>
            <Stack className="find_us">
              <Box className="find">Find Us</Box>
              <Box className="divider"></Box>
              <Stack className="details" sx={{ mt: "19.36px" }}>
                <Box className="detail_first">L:</Box>
                <Box className="detail_second">Texas, USA</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "42px" }}>
                <Box className="detail_first">P:</Box>
                <Box className="detail_second">+8210-4190-7877</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "9px" }}>
                <Box className="detail_first">E:</Box>
                <Box className="detail_second">www.ultragear.uz</Box>
              </Stack>
            </Stack>
          </Stack>
          <Box className="liner" sx={{ mt: "86px" }}></Box>
          <Box className="copyrights">
            Copyright Ultragear 2022, All right reserved.
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
