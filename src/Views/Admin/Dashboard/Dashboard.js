import React from "react";
import "./_dashboard.scss";
import DashboardSlider from "./DashboardSlider";
import TopNavBar from "./TopNavBar";
import { Switch, Route } from "react-router-dom";
import Users from "../Users/Users";
import Stores from "../Stores/Stores";
import UserRole from "../UserRoles/UserRoles";

export default function Dashboard(props) {
  const [sliderCollapsed, setSliderCollapsed] = React.useState(false);

  return (
    <section id="dashboard">
      <div className="flex">
        <div className="dashboard-left">
          <DashboardSlider
            sliderCollapsed={sliderCollapsed}
            setSliderCollapsed={setSliderCollapsed}
          />
        </div>
        <div className="dashboard-right">
          <TopNavBar
            history={props.history}
            sliderCollapsed={sliderCollapsed}
            setSliderCollapsed={setSliderCollapsed}
          />
          <div className="wrap">
            <Switch>
              <Route path={props.match.url + "/"} exact component={Users} />
              <Route
                path={props.match.url + "/store"}
                exact
                component={Stores}
              />
              <Route
                path={props.match.url + "/roles"}
                exact
                component={UserRole}
              />
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
}
