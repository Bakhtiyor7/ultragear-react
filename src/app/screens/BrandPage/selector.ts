import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectBrandPage = (state: AppRootState) => state.brandPage;
export const retrieveTargetBrands = createSelector(
  selectBrandPage,
  (BrandPage) => BrandPage.targetBrands
);
export const retrieveRandomBrands = createSelector(
  selectBrandPage,
  (BrandPage) => BrandPage.randomBrands
);
export const retrieveChosenBrand = createSelector(
  selectBrandPage,
  (BrandPage) => BrandPage.chosenBrand
);
export const retrieveTargetProducts = createSelector(
  selectBrandPage,
  (BrandPage) => BrandPage.targetProducts
);
export const retrieveChosenProduct = createSelector(
  selectBrandPage,
  (BrandPage) => BrandPage.chosenProduct
);
