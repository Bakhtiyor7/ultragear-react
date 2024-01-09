import { Logout } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";
import Basket from "./basket";

export function NavbarBrand(props: any) {
  return (
    <div className="format_brand home_navbar">
      <Container>
        <Stack
          flexDirection={"row"}
          className="navbar_config_brand"
          justifyContent={"space-between"}
        >
          <Box>
            <NavLink to="/" style={{ color: "#000" }} onClick={props.setPath}>
              <img
                src={"/home/ultragear_black.svg"}
                style={{ height: "90px", width: "140px" }}
                alt=""
              />
            </NavLink>
          </Box>
          <Stack className="navbar_links">
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/brand" activeClassName="underline">
                Brands
              </NavLink>
            </Box>
            {verifiedMemberData ? ( //** verified bosa sahifamga pageni korsat */
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

            {verifiedMemberData ? ( //** verified bosa sahifamga pageni korsat */
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
            gap={"15px"}
          >
            <Box className="basket_wrapper">
              <Basket
                backgroundColor={"#000"}
                cartItems={props.cartItems}
                onAdd={props.onAdd}
                onRemove={props.onRemove}
                onDelete={props.onDelete}
                onDeleteAll={props.onDeleteAll}
                setOrderRebuild={props.setOrderRebuild}
              />
            </Box>
            {!verifiedMemberData ? (
              <Box>
                <Button
                  variant="text"
                  style={{
                    color: "#000",
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
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
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
                    color: "#000000",
                  }}
                  onClick={props.handleSignupOpen}
                >
                  Signup
                </Button>
              ) : null}
            </Box>
          </Stack>
        </Stack>
        {/* <Stack className="head_information_brand">
          <img src="/home/rectangle.png" alt="" className="rectangle" />
          <Box className="header_title">
            <h1>Featured Brands</h1>
          </Box>

          <Box className="head_info_box">
            <Box className="category_box"></Box>
          </Box>
        </Stack> */}
      </Container>
    </div>
  );
}
