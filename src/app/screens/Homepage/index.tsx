import React, { useEffect } from "react";
import { Container } from "@mui/system";
import { Statistics } from "./statistics";
import { TopBrands } from "./topBrands";
import { BestBrands } from "./bestBrands";
import { BestDishes } from "./bestDishes";
import { Advertisements } from "./advertisements";
import { Events } from "./events";
import { Recommendations } from "./recommendations";
import "../../../css/home.css";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setBestBrands, setTopBrands } from "../../screens/Homepage/slice";
import { retrieveTopBrands } from "../../screens/Homepage/selector";
import { Brand } from "../../../types/user";
import BrandApiService from "../../apiServices/brandApiService";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTopBrands: (data: Brand[]) => dispatch(setTopBrands(data)),
  setBestBrands: (data: Brand[]) => dispatch(setBestBrands(data)),
});

export function HomePage() {
  // selector: store => data
  // INITIALIZATIONS
  const { setTopBrands, setBestBrands } = actionDispatch(useDispatch());

  useEffect(() => {
    // backend data request => data
    const brandService = new BrandApiService();
    brandService
      .getTopBrands()
      .then((data) => {
        setTopBrands(data);
      })
      .catch((err) => console.log(err));

    brandService
      .getBrands({ page: 1, limit: 4, order: "mb_point" })
      .then((data) => {
        setBestBrands(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="homepage">
      <Statistics />
      <TopBrands />
      <BestBrands />
      <BestDishes />
      <Advertisements />
      <Events />
      <Recommendations />
    </div>
  );
}
