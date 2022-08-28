import React from "react";
import { useEffect } from "react";
import Web3Modal from "web3modal";
import { useAuth } from "../../contexts/AuthContext";
import "./createAccountForm.scss";

const providerOptions = {
  /* See Provider Options Section */
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
});

export const CreateAccountForm = ({
  title,
  isLogged,
  setCurrentTab,
  classes,
}) => {
  const queryParams = new URLSearchParams(window.location.search);
  const accessToken = queryParams.get("accessToken");
  const { state, topicHandler, handleCreateAccount } = useAuth();

  const connectWallet = async () => {
    const provider = await web3Modal.connect();
    if (provider.selectedAddress !== "") {
      handleCreateAccount(provider.selectedAddress, accessToken);
      setCurrentTab(3);
    }
  };

  useEffect(() => {
    if (isLogged) setCurrentTab(3);
  }, [isLogged]);

  return (
    <button className={classes || `connect-btn`} onClick={connectWallet}>
      {title || "Connect Wallet"}
    </button>
  );
};
//export class CreateAccountForm extends React.Component {
//  queryParams = new URLSearchParams(window.location.search);
//  state = { accessToken: this.queryParams.get("accessToken") };

//  connectWallet = async () => {
//    const provider = await web3Modal.connect();
//    if (provider.selectedAddress !== "") {
//      this.props.createAccount(
//        provider.selectedAddress,
//        this.state.accessToken
//      );
//    }
//  };

//  render() {
//    console.log(this.props);
//    return (
//      <button className="connect-btn" onClick={this.connectWallet}>
//        {this.props.title || "Connect Wallet"}
//      </button>
//    );
//  }
//}
