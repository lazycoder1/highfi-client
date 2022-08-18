import React from "react";
import "./createAccountForm.scss";
import Web3Modal from "web3modal";

const providerOptions = {
    /* See Provider Options Section */
};

const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required
});

export class CreateAccountForm extends React.Component {
    queryParams = new URLSearchParams(window.location.search);
    state = { accessToken: this.queryParams.get("accessToken") };
    createAccount = (address) => {
        if (address != "") {
            this.props.createAccount(address, this.state.accessToken);
        }
    };

    connectWallet = async () => {
        const provider = await web3Modal.connect();
        this.createAccount(provider.selectedAddress);
    };

    render() {
        return (
            <div className="entry-page">
                <div>
                    <label>Please login through the app !</label>

                    <br />
                    <label>Or connect your wallet to start chatting.</label>
                    <br />
                    <button className="button" onClick={this.connectWallet}>
                        connect wallet
                    </button>
                </div>
            </div>
        );
    }
}
