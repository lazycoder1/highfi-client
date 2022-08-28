import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

const Header = ({ setCurrentTab }) => {

  return (
    <div className="header">
      <div className="icon" onClick={() => setCurrentTab(1)}>
        <AiOutlineArrowLeft color={"#2C5282"} size={18} />
      </div>
      <div className="logo">LightPay</div>
      <div className="icon">
        <FaUserAlt size={18} color={"#2C5282"} />
      </div>
    </div>
  );
};

export default Header;
