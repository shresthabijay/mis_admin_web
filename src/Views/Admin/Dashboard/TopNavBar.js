import React from "react";
import { Button, Icon, Tooltip } from "antd";
import { getDetailsFromLocalStorage } from "../../../Helpers/helper";

export default function TopNavBar(props) {
  const doLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login_details");
    props.history.push("/login");
  };

  return (
    <nav>
      <div className="wrap">
        <div className="flex jcsb ci">
          <div className="left">
            <div className="flex ci">
              <React.Fragment>
                <span
                  style={{ padding: "4px", cursor: "pointer" }}
                  onClick={() => {
                    props.setSliderCollapsed(!props.sliderCollapsed);
                  }}
                >
                  <Icon type="menu" />
                </span>
                <div className="hgap"></div>
              </React.Fragment>
              <h2 style={{ fontSize: "20px", fontWeight: "700" }}>
                Shrestha Store [{getDetailsFromLocalStorage().name}]
              </h2>
            </div>
          </div>
          <div className="right">
            <Tooltip title="Logout">
              <Button
                onClick={() => {
                  doLogout();
                }}
                shape="circle"
              >
                <Icon type="logout" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </nav>
  );
}
