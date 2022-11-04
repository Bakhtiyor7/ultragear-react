import React, { useState } from "react";
import { Container } from "@mui/system";
import "../../../css/order.css";
import { Box, Stack } from "@mui/material";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import SvgIcon from "@mui/material/SvgIcon";

import PausedOrders from "../../components/orders/pausedOrders";
import ProcessOrders from "../../components/orders/processOrders";
import FinishedOrders from "../../components/orders/finishedOrders";

export function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"order_page"}>
      <Container
        style={{ display: "flex", flexDirection: "row" }}
        sx={{ mt: "50px", mb: "50px" }}
      >
        <Stack className={"order_left"}>
          <TabContext value={value}>
            <Box className={"order_nav_frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  value={value}
                  aria-label="basic tabs example"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Tab label="Buyurtmalarim" value="1" />
                  <Tab label="Jarayon" value="2" />
                  <Tab label="Yakunlangan" value="3" />
                </TabList>
              </Box>
            </Box>
            <Stack className={"order_main_content"}>
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className={"order_right"}>
          <Box className={"order_info_box"}>
            <Box>
              <div className={"order_user_img"}>
                <img
                  className={"order_user_avatar"}
                  src={"/auth/default_user.svg"}
                />
                <div className={"order_user_icon_box"}>
                  <img src="/icons/user_icon.svg" />
                </div>
              </div>
              <span className={"order_user_name"}>Baxtiyor</span>
              <span className={"order_user_prof"}>USER</span>
            </Box>
            <Box style={{ border: "1px solid rgb(161, 161, 161" }}></Box>
            <Box className={"order_user_address"}>
              <div style={{ display: "flex" }}>
                <SvgIcon></SvgIcon>
              </div>
            </Box>
          </Box>
          <Box className={"order_info_box"}></Box>
        </Stack>
      </Container>
    </div>
  );
}
