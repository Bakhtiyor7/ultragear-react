import React, { useEffect, useState } from "react";
import { TopBrands } from "./topBrands";
import { BestProducts } from "./bestProducts";
import { Events } from "./events";
import "../../../css/home.css";

//REDUX
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setBestBrands, setTopBrands } from "./slice";
import { Brand } from "../../../types/user";
import BrandApiService from "../../apiServices/brandApiService";
import { Advertisement } from "./advs";
import { Categories } from "./categories";
import ClipLoader from "react-spinners/ClipLoader";
import { Advertisements } from "./advertisements";
import { CommunityChats } from "../CommunityPage/communityChats";
import { Chat } from "@mui/icons-material";
import { Button } from "@material-ui/core";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTopBrands: (data: Brand[]) => dispatch(setTopBrands(data)),
  setBestBrands: (data: Brand[]) => dispatch(setBestBrands(data)),
});

export function HomePage(props: any) {
  // INITIALIZATIONS
  const { setTopBrands, setBestBrands } = actionDispatch(useDispatch());

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleChat = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const brandService = new BrandApiService();
        await brandService
          .getTopBrands()
          .then((data) => {
            setTopBrands(data);
          })
          .catch((err) => console.log(err));

        await brandService
          .getBrands({ page: 1, limit: 4, order: "mb_point" })
          .then((data) => {
            setBestBrands(data);
          })
          .catch((err) => console.log(err));
        setLoading(false);
      } catch (err) {
        console.log("Error fetching data", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return loading ? (
    <div className={"loader_wrapper"}>
      <ClipLoader
        color={"#00BFFF"}
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div className="homepage">
      <Advertisements />
      <Categories />
      <Advertisement />
      <Events />
      <BestProducts />
      <TopBrands />

      {/* <Recommendations /> */}
    </div>
  );
}

// <div className="chat-button-container">
//   {/* <img src="/icons/chat.webp" style={{ height: "100%" }} /> */}
//   <Button className="chat-button" onClick={toggleChat}>
//     <Chat sx={{mr: "15px"}} />
//     Chat
//   </Button>

//   {open && (
//     <div className="chat-popup">
//       {/* Your chat content goes here */}
//       <div className="chat-content">
//         <CommunityChats />
//       </div>
//     </div>
//   )}
// </div>
