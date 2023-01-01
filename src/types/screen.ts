import { BoArticle } from "./boArticle";
import { Follower, Following } from "./follow";
import { Order } from "./order";
import { Product } from "./product";
import { Member, Brand } from "./user";

/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState;
  brandPage: BrandPageState;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
  memberPage: MemberPageState;
}

/** HOMEPAGE */
export interface HomePageState {
  topBrands: Brand[];
  bestBrands: Brand[];
  trendProducts: Product[];
  bestBoArticles: BoArticle[];
  trendBoArticles: BoArticle[];
  newsBoArticles: BoArticle[];
}

/** BRAND PAGE */
export interface BrandPageState {
  targetBrands: Brand[];
  randomBrands: Brand[];
  chosenBrand: Brand | null;
  targetProducts: Product[];
  chosenProduct: Product | null;
}

/** ORDERS PAGE */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}

/** COMMUNITY PAGE */
export interface CommunityPageState {
  targetBoArticles: BoArticle[];
}

/**  MEMBER PAGE */
export interface MemberPageState {
  chosenMember: Member | null;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticle: BoArticle | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
}
