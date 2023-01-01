import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
  topBrands: [],
  bestBrands: [],
  trendProducts: [],
  bestBoArticles: [],
  trendBoArticles: [],
  newsBoArticles: [],
};

const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTopBrands: (state, action) => {
      state.topBrands = action.payload;
    },
    setBestBrands: (state, action) => {
      state.bestBrands = action.payload;
    },
    setTrendProducts: (state, action) => {
      state.trendProducts = action.payload;
    },
    setBestBoArticles: (state, action) => {
      state.bestBoArticles = action.payload;
    },
    setTrendBoArticles: (state, action) => {
      state.trendBoArticles = action.payload;
    },
    setNewsBoArticles: (state, action) => {
      state.newsBoArticles = action.payload;
    },
  },
});
// ishlatish
export const {
  setTopBrands,
  setBestBrands,
  setTrendProducts,
  setBestBoArticles,
  setTrendBoArticles,
  setNewsBoArticles,
} = HomePageSlice.actions;

//storega ulash
const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;
