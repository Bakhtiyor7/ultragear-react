import React, {useEffect, useState} from "react";
import {Route, BrowserRouter as Router, Switch, useLocation} from "react-router-dom";
import "../css/App.css";
import "../css/footer.css";
import "../css/navbar.css";

import "../app/apiServices/verify";
import { Definer } from "../lib/Definer";
import {
  sweetFailureProvider,
  sweetTopSmallSuccessAlert,
} from "../lib/sweetAlert";
import { CartItem } from "../types/others";
import { Product } from "../types/product";
import MemberApiService from "./apiServices/memberApiService";
import AuthenticationModal from "./components/auth";
import { Footer } from "./components/footer";
import { NavbarBrand } from "./components/header/brand";
import { NavbarHome } from "./components/header";
import { NavbarOthers } from "./components/header/others";
import { BrandPage } from "./screens/BrandPage";
import { CommunityPage } from "./screens/CommunityPage";
import { HelpPage } from "./screens/HelpPage";
import { HomePage } from "./screens/Homepage";
import { LoginPage } from "./screens/LoginPage/indes";
import { MemberPage } from "./screens/MemberPage";
import { OrdersPage } from "./screens/OrdersPage";
import MobileUi from "./components/responsive_ui/responsive";
import ReactGA from 'react-ga';

ReactGA.initialize('G-2VPWGWJL2G');
function App() {
  //** INITIALIZATIONS */
  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const cartJson: any = localStorage.getItem("cart_data");
  const current_cart: CartItem[] = JSON.parse(cartJson) ?? [];
  const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);

  // ==== Google Analytics related
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
  /**  HANDLERS */
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogoutClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLogOut = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };
  const handleLogOutRequest = async () => {
    try {
      const memberApiService = new MemberApiService();
      await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert("success", 700, true);
    } catch (err: any) {
      console.log(err);
      sweetFailureProvider(Definer.general_err1);
    }
  };

  const onAdd = (product: Product) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === product._id
    );
    if (exist) {
      const cart_updated = cartItems.map((item: CartItem) =>
        item._id === product._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const new_item: CartItem = {
        _id: product._id,
        quantity: 1,
        name: product.product_name,
        price: product.product_price,
        image: product.product_images[0],
      };
      const cart_updated = [...cartItems, { ...new_item }];
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onRemove = (item: CartItem) => {
    const item_data: any = cartItems.find(
      (ele: CartItem) => ele._id === item._id
    );
    if (item_data.quantity === 1) {
      const cart_updated = cartItems.filter(
        (ele: CartItem) => ele._id !== item._id
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    } else {
      const cart_updated = cartItems.map((ele: CartItem) =>
        ele._id === item._id
          ? { ...item_data, quantity: item_data.quantity - 1 }
          : ele
      );
      setCartItems(cart_updated);
      localStorage.setItem("cart_data", JSON.stringify(cart_updated));
    }
  };
  const onDelete = (item: CartItem) => {
    const cart_updated = cartItems.filter(
      (ele: CartItem) => ele._id !== item._id
    );
    setCartItems(cart_updated);
    localStorage.setItem("cart_data", JSON.stringify(cart_updated));
  };
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cart_data");
  };

  const mobileSize = 768;
  const isMobile = window.innerWidth <= mobileSize;

  return (
    <Router>
      {isMobile ? (<MobileUi/>) : (
<>
  {main_path == "/" ? (
      <NavbarHome
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignupOpen={handleSignUpOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
      />
  ) : main_path.includes("/brand") ? (
      <NavbarBrand
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignupOpen={handleSignUpOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
      />
  ) : (
      <NavbarOthers
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignupOpen={handleSignUpOpen}
          anchorEl={anchorEl}
          open={open}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogOutRequest={handleLogOutRequest}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setOrderRebuild={setOrderRebuild}
      />
  )}
  <Switch>
    <Route path="/brand">
      <BrandPage onAdd={onAdd} />
    </Route>
    <Route path="/community">
      <CommunityPage />
    </Route>
    <Route path="/orders">
      <OrdersPage
          orderRebuild={orderRebuild}
          setOrderRebuild={setOrderRebuild}
      />
    </Route>
    <Route path="/member-page">
      <MemberPage />
    </Route>
    <Route path="/help">
      <HelpPage />
    </Route>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/">
      <HomePage setPath={setPath} />
    </Route>
  </Switch>
  <Footer setPath={setPath} />
  <AuthenticationModal
      loginOpen={loginOpen}
      handleLoginOpen={handleLoginOpen}
      handleLoginClose={handleLoginClose}
      signUpOpen={signUpOpen}
      handleSignUpOpen={handleSignUpOpen}
      handleSignUpClose={handleSignUpClose}
  />
        </>
      )}
    </Router>
  );
}

export default App;
