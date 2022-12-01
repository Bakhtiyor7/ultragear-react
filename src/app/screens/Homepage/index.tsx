import React, { useEffect } from "react";
import { Container } from "@mui/system";
import { Statistics } from "./statistics";
import { TopRestaurants } from "./topRestaurants";
import { BestRestaurants } from "./bestRestaurants";
import { BestDishes } from "./bestDishes";
import { Advertisements } from "./advertisements";
import { Events } from "./events";
import { Recommendations } from "./recommendations";
import "../../../css/home.css";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTopRestaurants } from "../../screens/Homepage/slice";
import { retrieveTopRestaurants } from "../../screens/Homepage/selector";
import { Restaurant } from "../../../types/user";
import RestaurantApiService from "../../apiServices/restaurantApiService";

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data)),
});

//** REDUX SELECTOR */

const topRestaurantsRetriever = createSelector(
  retrieveTopRestaurants,
  (topRestaurants) => ({
    topRestaurants,
  })
);

export function HomePage() {
  // selector: store => data
  // INITIALIZATION
  const { setTopRestaurants } = actionDispatch(useDispatch());

  useEffect(() => {
    // backend data request => data
    const restaurantService = new RestaurantApiService();
    restaurantService
      .getTopRestaurants()
      .then((data) => {
        setTopRestaurants(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="homepage">
      <Statistics />
      <TopRestaurants />
      <BestRestaurants />
      <BestDishes />
      <Advertisements />
      <Events />
      <Recommendations />
    </div>
  );
}
