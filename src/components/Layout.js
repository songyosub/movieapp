import React from "react";
import Tabbar from "./Tabbar";
import Modal from "./Modal";

const Layout = ({ children }) => {
  return (
    <div className="container">
      {children}
      <Modal title="즐겨찾기" />
      <Tabbar />
    </div>
  );
};

export default Layout;
