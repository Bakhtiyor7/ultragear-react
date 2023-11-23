import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function Footer(props: any) {
  return (
    <div className="footer_config">
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Stack className="main_footer_container">
          <Stack className="footer_nav">
            <NavLink
              to={"/brand"}
              onClick={props.setPath}
              className={"footer_navlinks"}
            >
              Brands
            </NavLink>
            <NavLink
              to={"/community"}
              onClick={props.setPath}
              className={"footer_navlinks"}
            >
              Community
            </NavLink>
            <NavLink
              to={"/help"}
              onClick={props.setPath}
              className={"footer_navlinks"}
            >
              Help
            </NavLink>
          </Stack>
          <Stack className="footer_info_container">
            <Stack
              className="info"
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <NavLink
                to={"/"}
                style={{ color: "white" }}
                activeClassName="none"
                onClick={props.setPath}
                className="footer_title"
              >
                <img src="/others/Logo.svg" />
              </NavLink>
              <Box className="main_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor Sed ut perspiciatis unde omnis iste
                <Box className="copyrights">
                  Copyright Ultragear 2022, All right reserved.
                </Box>
              </Box>
              <Stack className="contact_links">
                <Box>
                  <img src={"/home/facebook.svg"} alt="" />
                </Box>
                <Box>
                  <img src={"/home/twitter.svg"} alt="" />
                </Box>
                <Box>
                  <img src={"/home/linkedin.svg"} alt="" />
                </Box>
                <Box>
                  <img src={"/home/instagram.svg"} alt="" />
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
