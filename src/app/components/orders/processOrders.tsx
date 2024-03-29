import React from "react";
import TabPanel from "@material-ui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
//REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../types/product";
import moment from "moment";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiService";
import { verifiedMemberData } from "../../apiServices/verify";

/** REDUX SELECTOR */
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

let dt = new Date();

export default function ProcessOrders(props: any) {
  // INITIALIZATIONS
  const { processOrders } = useSelector(processOrdersRetriever);

  //  HANDLERS
  const finishOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "FINISHED" };

      if (!verifiedMemberData) {
        sweetFailureProvider("Please Login first!", true);
      }

      let confirmation = window.confirm(
        "Buyurtmani olganingizni tasdiqlaysizmi?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        await orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date());
      }
    } catch (err) {
      console.log("deleteOrderHandler, ERROR", err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order: Order) => {
          return (
            <Box className={"order_main_box"}>
              <Box className={"order_box_scroll"}>
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const image_path = `${serverApi}/${product.product_images[0]}`;
                  return (
                    <Box className={"ordersName_price"}>
                      <img src={image_path} className={"orderDishImg"} />
                      <p className={"titleDish"}>{product.product_name}</p>
                      <Box className={"priceBox"}>
                        <p>{item.item_price}</p>
                        <p style={{ marginLeft: "10px" }}>*</p>
                        <p style={{ marginLeft: "10px" }}>
                          {item.item_quantity}
                        </p>

                        <p style={{ marginLeft: "200px", color: "#000" }}>
                          ${item.item_price * item.item_quantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total_price_box blue_solid"}>
                <Box className={"boxTotal"}>
                  <p style={{ color: "#144272" }}>product price:</p>
                  <p>
                    ${order.order_total_amount - order.order_delivery_cost},
                  </p>

                  <p style={{ color: "#144272" }}>delivery cost:</p>
                  <p>${order.order_delivery_cost}, </p>

                  <p style={{ color: "#144272" }}>total:</p>
                  <p style={{ color: "#000", fontWeight: "600" }}>
                    ${order.order_total_amount}{" "}
                  </p>
                </Box>
                <p className="data_compl">
                  {moment(order.createdAt).format("YY-MM-DD HH:mm")}
                </p>
                <Button
                  value={order._id}
                  onClick={finishOrderHandler}
                  variant="contained"
                  style={{ borderRadius: "10px" }}
                >
                  Confirm payment
                </Button>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
