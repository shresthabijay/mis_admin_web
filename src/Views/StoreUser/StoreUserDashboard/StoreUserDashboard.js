import React from "react";
import { Switch, Route } from "react-router-dom";
import StoreUserDashboardSlider from "./StoreUserDashboardSlider";
import TopNavBar from "../../Admin/Dashboard/TopNavBar";
import StoreUserStore from "../StoreUserStore/StoreUserStore";
import StoreSupplier from "../StoreSupplier/StoreSupplier";
import StoreProduct from "../StoreProduct/StoreProduct";
import AddSupplier from "../AddSupplier/AddSupplier";
import AddProduct from "../AddProduct/AddProduct";

export default function StoreUserDashboard(props) {
  const [sliderCollapsed, setSliderCollapsed] = React.useState(false);

  return (
    <section id="dashboard">
      <div className="flex">
        <div className="dashboard-left">
          <StoreUserDashboardSlider
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
              <Route
                path={props.match.url + "/"}
                exact
                component={StoreUserStore}
              />
              <Route
                path={props.match.url + "/suppliers"}
                exact
                component={StoreSupplier}
              />
              <Route
                path={props.match.url + "/products"}
                exact
                component={StoreProduct}
              />
              <Route
                path={props.match.url + "/add_supplier"}
                exact
                component={AddSupplier}
              />
              <Route
                path={props.match.url + "/add_product"}
                exact
                component={AddProduct}
              />
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
}
