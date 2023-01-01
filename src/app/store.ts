import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/Homepage/slice";
import reduxLogger from "redux-logger";
import BrandPageReducer from "./screens/BrandPage/slice";
import OrdersPageReducer from "./screens/OrdersPage/slice";
import CommunityPageReducer from "./screens/CommunityPage/slice";
import MemberPageReducer from "./screens/MemberPage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    brandPage: BrandPageReducer,
    ordersPage: OrdersPageReducer,
    communityPage: CommunityPageReducer,
    memberPage: MemberPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
