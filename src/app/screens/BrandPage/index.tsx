import React from "react";
import { Container } from "@mui/system";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ChosenDish } from "./chosenProduct";
import { OneBrand } from "./oneBrand";
import { AllBrands } from "./allBrands";
import "../../../css/restaurant.css";

export function BrandPage(props: any) {
  let brand = useRouteMatch();
  console.log(brand);
  return (
    <div className="restaurant_page">
      <Switch>
        <Route path={`${brand.path}/products/:product_id`}>
          <ChosenDish onAdd={props.onAdd} />
        </Route>
        <Route path={`${brand.path}/:brand_id`}>
          <OneBrand onAdd={props.onAdd} />
        </Route>
        <Route path={`${brand.path}`}>
          <AllBrands />
        </Route>
      </Switch>
    </div>
  );
}
