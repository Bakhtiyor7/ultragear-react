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

//** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTopBrands: (data: Brand[]) => dispatch(setTopBrands(data)),
  setBestBrands: (data: Brand[]) => dispatch(setBestBrands(data)),
});

export function HomePage(props: any) {
  // INITIALIZATIONS
  const { setTopBrands, setBestBrands } = actionDispatch(useDispatch());

  const [loading, setLoading] = useState(true);

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
