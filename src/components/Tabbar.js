import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../Router";

import "../styles/Tabbar.css";

const Tabbar = () => {
  return (
    <nav className="tabbar">
      <div className="tabbar-item">
        {routes.map((route) => {
          return (
            <div key={route.title}>
              <Link to={route.path} className="tabbar-link">
                {route.title}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Tabbar;
