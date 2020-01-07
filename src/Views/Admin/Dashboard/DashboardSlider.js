import React from "react";
import { Menu, Icon, Layout } from "antd";
import logo from "../../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

export default function DashboardSlider(props) {
  const [selectedItem, setSelectedItem] = React.useState("0");

  return (
    <Layout hasSider>
      <Layout.Sider
        theme="dark"
        trigger={null}
        breakpoint="lg"
        onBreakpoint={broken => {
          if (broken) {
            props.setSliderCollapsed(true);
          } else {
            props.setSliderCollapsed(false);
          }
        }}
        onCollapse={() => {
          props.setSliderCollapsed(!props.sliderCollapsed);
        }}
        collapsedWidth={0}
        width={250}
        collapsed={props.sliderCollapsed}
        // collapsible={true}
      >
        <Menu
          style={{ minHeight: "100vh", fontWeight: "700" }}
          selectedKeys={[selectedItem]}
          mode="inline"
          theme="dark"
        >
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <Menu.Item key="1">
            <NavLink
              to="/admin"
              isActive={e => {
                if (e && e.isExact) setSelectedItem("1");
              }}
            >
              <Icon type="inbox" />
              <span>Users</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink
              to="/admin/store"
              isActive={e => {
                if (e && e.isExact) setSelectedItem("2");
              }}
            >
              <Icon type="pie-chart" />
              <span>Stores</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink
              to="/admin/roles"
              isActive={e => {
                if (e && e.isExact) setSelectedItem("3");
              }}
            >
              <Icon type="pie-chart" />
              <span>User Roles</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    </Layout>
  );
}
