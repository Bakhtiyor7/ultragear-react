import { Box, Container, Stack } from "@mui/material";
import React from "react";

export function Footer() {
  return (
    <div className="footer_config">
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Stack className="main_footer_container">
          <Stack className="footer_nav">
            <h1>Brands</h1>
            <h1>Community</h1>
            <h1>Help</h1>
          </Stack>
          <Stack className="footer_info_container">
            <Stack
              className="info"
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Box className="footer_title">
                <img src="/others/Logo.svg" />
              </Box>
              <Box className="main_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor Sed ut perspiciatis unde omnis iste
                <Box className="copyrights">
                  Copyright Ultragear 2022, All right reserved.
                </Box>
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
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
