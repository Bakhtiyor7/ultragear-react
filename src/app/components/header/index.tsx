import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Basket from "./basket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { verifiedMemberData } from "../../apiServices/verify";

export function NavbarHome(props: any) {
  return (
    <div className="format home_wrapper">
      <Stack className="navbar_config_wrapper">
        <Stack
          flexDirection={"row"}
          className="navbar_config"
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <NavLink
              to="/"
              style={{ color: "white" }}
              activeClassName="none"
              onClick={props.setPath}
            >
              <img
                src={"/home/ultragear.svg"}
                style={{ height: "90px", width: "140px" }}
                alt=""
              />
            </NavLink>
          </Box>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            className="navbar_links"
          >
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/brand" activeClassName="underline">
                Brands
              </NavLink>
            </Box>
            {verifiedMemberData ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/orders" activeClassName="underline">
                  My Orders
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/community" activeClassName="underline">
                Community
              </NavLink>
            </Box>

            {verifiedMemberData ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/help" activeClassName="underline">
                Support
              </NavLink>
            </Box>
          </Stack>
          <Stack
            flexDirection={"row"}
            justifyContent="space-evenly"
            alignItems={"center"}
          >
            <Basket
              cartItems={props.cartItems}
              onAdd={props.onAdd}
              onRemove={props.onRemove}
              onDelete={props.onDelete}
              onDeleteAll={props.onDeleteAll}
              setOrderRebuild={props.setOrderRebuild}
              style={{ color: "#000" }}
            />
            {!verifiedMemberData ? (
              <Box>
                <Button
                  variant="text"
                  style={{
                    color: "#ffffff",
                  }}
                  onClick={props.handleLoginOpen}
                >
                  LOGIN
                </Button>
              </Box>
            ) : (
              <img
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "24px",
                }}
                src={verifiedMemberData.mb_image}
                onClick={props.handleLogoutClick}
                alt=""
              />
            )}

            <Menu
              anchorEl={props.anchorEl}
              open={props.open}
              onClose={props.handleCloseLogOut}
              onClick={props.handleCloseLogOut}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32)",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '"',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={props.handleLogOutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <Box>
              {!verifiedMemberData ? ( // login buganda signup button yoqoladi
                <Button
                  variant="text"
                  style={{
                    color: "#ffffff",
                  }}
                  onClick={props.handleSignupOpen}
                >
                  Signup
                </Button>
              ) : null}
            </Box>
          </Stack>
        </Stack>
      </Stack>

      {/* ========================================== */}
      <Stack className="home_navbar">
        <Container className="navlinks_container">
          <Stack className="head_info">
            <Stack justifyContent={"column"} className="head_items">
              <Box className="define_restaurant">
                Find the right device for yourself
              </Box>
              <Box className="timeline_service">
                Hub for unlimited devices of your desire. <br />
                Find out by checking among all of our brands
              </Box>
              <NavLink to={"/brand"} onClick={props.setPath}>
                <Button className="shop_btn" size={"large"} variant="contained">
                  SHOP NOW
                </Button>
              </NavLink>
            </Stack>
            <Box className="big_img">
              <img src="/home/airpods_img.svg" />
            </Box>
          </Stack>
        </Container>
      </Stack>
    </div>
  );
}
