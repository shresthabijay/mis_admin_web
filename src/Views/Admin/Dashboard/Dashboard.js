import React from "react";
import "./_dashboard.scss";
import DashboardSlider from "./DashboardSlider";
import TopNavBar from "./TopNavBar";
import { Switch, Route } from "react-router-dom";
import { User } from "../User/User";
import { Stream } from "../Stream/Stream";
import { Course } from "../Course/Course";
import { StreamAdmin } from "../StreamAdmin/StreamAdmin";
import { StreamCourse } from "../StreamCourse/StreamCourse";
import { Teacher } from "../Teacher/Teacher";
import { Student } from "../Student/Student";
import { Notice } from "../Notice/Notice";

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
          <div className="content-area">
            <Switch>
              <Route path={props.match.url + "/streams"} exact component={Stream} />
              <Route path={props.match.url + "/courses"} exact component={Course} />
              <Route path={props.match.url + "/stream_admins"} exact component={StreamAdmin} />
              <Route path={props.match.url + "/stream_courses"} exact component={StreamCourse} />
              <Route path={props.match.url + "/teachers"} exact component={Teacher} />
              <Route path={props.match.url + "/students"} exact component={Student} />
              <Route path={props.match.url + "/notices"} exact component={Notice} />
              <Route path={props.match.url + "/users"} exact component={User} />
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
}
