import React from "react";
import { useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";

const ConversationPanel = ({ title }) => {
  useEffect(() => {
    fetch("/data.json").then((data) => console.log("data", data));
  }, []);

  return (
    <div className="conversation-panel">
      <h3>My Conversations</h3>
      <div className="message">
        <div className="img">
          {/*<img src="" alt="" />*/}
          <FaUserAlt size={25} color={"#2C5282"} />
        </div>
        <div className="info">
          <div className="head">
            <div className="name">LightPay / Adam</div>
            <div className="time">45 min ago</div>
          </div>
          <p className="msg">Let me get back in five mins...</p>
        </div>
      </div>
      <div className="message">
        <div className="img">
          {/*<img src="" alt="" />*/}
          <FaUserAlt size={25} color={"#2C5282"} />
        </div>
        <div className="info">
          <div className="head">
            <div className="name">LightPay / Adam</div>
            <div className="time">45 min ago</div>
          </div>
          <p className="msg">Let me get back in five mins...</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationPanel;
