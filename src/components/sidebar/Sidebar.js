import React from "react";
import "./sidebar.css";
import SidebarItem from "./../sidebar-item/SidebarItem";
import {
  TiNotesOutline,
  TiWiFiOutline,
  TiHeartFullOutline,
  TiCogOutline
} from "react-icons/ti";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="ms_sidemenu_wrapper">
        <div className="ms_sidemenu_inner">
          <div className="ms_nav_wrapper">
            <ul>
              <SidebarItem to="/">
                <TiNotesOutline className="icon" />
              </SidebarItem>
              <SidebarItem to="/online">
                <TiWiFiOutline className="icon" />
              </SidebarItem>

              <SidebarItem to="/favorites">
                <TiHeartFullOutline className="icon" />
              </SidebarItem>

              <SidebarItem to="/settings">
                <TiCogOutline className="icon" />
              </SidebarItem>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
