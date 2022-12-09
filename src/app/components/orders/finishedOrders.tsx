import React from "react";
import TabPanel from "@material-ui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
//REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "../../screens/OrdersPage/selector";

/** REDUX SELECTOR */
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);

const finishedOrders = [
  [1, 2, 3],
  [1, 2, 3],
];

export default function FinishedOrders() {
  // INITIALIZATIONS
  //const { finishedOrders } = useSelector(finishedOrdersRetriever);
  return (
    <TabPanel value={"3"}>
      <Stack>
        {finishedOrders?.map((order) => {
          return (
            <Box className={"order_main_box"}>
              <Box className={"order_box_scroll"}>
                {order.map((item) => {
                  const image_path = `/others/kebab.jpeg`;
                  return (
                    <Box className={"ordersName_price"}>
                      <img src={image_path} className={"orderDishImg"} />
                      <p className={"titleDish"}>Grill</p>
                      <Box className={"priceBox"}>
                        <p>30$</p>
                        <img src={"/icons/Close.svg"} />
                        <p>3</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>90$</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box red_solid"}>
                <Box className={"boxTotal"}>
                  <p>mahsulot narxi</p>
                  <p>$90</p>
                  <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                  <p>yetkazish xizmati</p>
                  <p>$2</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                  />
                  <p>jami narx</p>
                  <p>$92</p>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
