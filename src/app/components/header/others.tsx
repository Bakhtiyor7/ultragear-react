import React from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Basket from "./basket";
import { verifiedMemberData } from "../../apiServices/verify";

export function NavbarOthers(props: any) {
  return (
    <div className="format_others home_navbar">
      <Container>
        <Stack
          flexDirection={"row"}
          className="navbar_config"
          justifyContent={"space-between"}
        >
          <Box>
            <NavLink to="/" style={{ color: "#fff" }} onClick={props.setPath}>
              <img
                src={"/auth/logo-white.png"}
                style={{ height: "90px", width: "140px" }}
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
              <NavLink
                to="/brand"
                activeClassName="underline"
                style={{
                  color: "#fff",
                }}
              >
                Brands
              </NavLink>
            </Box>
            {verifiedMemberData ? ( //** verified bosa sahifamga pageni korsat */
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink
                  to="/orders"
                  activeClassName="underline"
                  style={{
                    color: "#fff",
                  }}
                >
                  My Orders
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink
                to="/community"
                activeClassName="underline"
                style={{
                  color: "#fff",
                }}
              >
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
              <NavLink
                to="/help"
                activeClassName="underline"
                style={{
                  color: "#fff",
                }}
              >
                Support
              </NavLink>
            </Box>
          </Stack>
          <Basket
            backgroundColor={"#000"}
            cartItems={props.cartItems}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
            onDelete={props.onDelete}
            onDeleteAll={props.onDeleteAll}
            setOrderRebuild={props.setOrderRebuild}
          />
          <Stack
            flexDirection={"row"}
            justifyContent="space-evenly"
            alignItems={"center"}
          >
            {!verifiedMemberData ? (
              <Box>
                <Button
                  variant="text"
                  style={{
                    color: "#fff",
                  }}
                  onClick={props.handleLoginOpen}
                >
                  LOGIN
                </Button>
              </Box>
            ) : (
              <img
                style={{ width: "48px", height: "48px", borderRadius: "24px" }}
                src={verifiedMemberData.mb_image}
                onClick={props.handleLogoutClick}
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
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
