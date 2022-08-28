import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { CreateAccountForm } from "./CreateAccountForm";
import Layout from "./Layout/Layout";

const ConnectingWallet = ({ setCurrentTab }) => {
  const { state } = useAuth();
  const { topic } = state;

  const bg = !topic ? "#8EBDE6" : "#2C5282";

  const logoutHandler = () => {
    console.log("logout");
  };

  return (
    <>
      <div className="connecting">
        <h3 style={{ fontSize: "16px" }}>Start by connecting wallet</h3>
        <p>
          Our customer support specialists will be able to help you right away
          and you will be able to access conversation history very time you
          enter chat.
        </p>
      </div>
      <div className="footer">
        <>
          <CreateAccountForm
            title={"Connect Wallet"}
            setCurrentTab={setCurrentTab}
            classes='next-btn'
          />
          {/*<button className="connect-btn" onClick={logoutHandler}>
            Logout
          </button>*/}
          <button className="connect-btn">
            How to connect wallet?
          </button>
        </>
      </div>
    </>
  );
};

export default ConnectingWallet;
