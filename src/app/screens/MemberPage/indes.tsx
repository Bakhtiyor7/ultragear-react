import React from "react";
import { Container } from "@mui/system";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { VisitMyPage } from "./VisitMyPage";
import { VisitOtherPage } from "./VisitOtherPage";
import "../../../css/my_page.css";

export function MemberPage() {
  let memeber = useRouteMatch();
  console.log(memeber);
  return (
    <div className="member_page">
      <Switch>
        <Route path={`${memeber.path}/other`}>
          <VisitOtherPage />
        </Route>
        <Route path={`${memeber.path}`}>
          <VisitMyPage />
        </Route>
      </Switch>
    </div>
  );
}
