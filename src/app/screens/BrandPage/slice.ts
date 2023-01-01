import { createSlice } from "@reduxjs/toolkit";
import { BrandPageState } from "../../../types/screen";

const initialState: BrandPageState = {
  targetBrands: [],
  randomBrands: [],
  chosenBrand: null,
  targetProducts: [],
  chosenProduct: null,
};

const brandPageSlice = createSlice({
  name: "brandPage",
  initialState,
  reducers: {
    setTargetBrands: (state, action) => {
      state.targetBrands = action.payload;
    },
    setRandomBrands: (state, action) => {
      state.randomBrands = action.payload;
    },
    setChosenBrand: (state, action) => {
      state.chosenBrand = action.payload;
    },
    setTargetProducts: (state, action) => {
      state.targetProducts = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
});

export const {
  setTargetBrands,
  setRandomBrands,
  setChosenBrand,
  setTargetProducts,
  setChosenProduct,
} = brandPageSlice.actions;

const BrandPageReducer = brandPageSlice.reducer;
export default BrandPageReducer;
