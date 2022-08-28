import {
  Avatar, Message, MessageList
} from "@chatscope/chat-ui-kit-react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiRadioCircle } from "react-icons/bi";
import { RiSendPlane2Fill } from "react-icons/ri";
import { format } from "timeago.js";
import "./MessagesPanel.scss";

export class MessagesPanel extends React.Component {
  state = { input_value: "" };
  send = () => {
    if (this.state.input_value && this.state.input_value != "") {
      this.props.onSendMessage(
        this.state.input_value
      );
      this.setState({ input_value: "" });
    }
  };

  handleInput = (e) => {
    this.setState({ input_value: e.target.value });
  };

  handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      this.send();
    }
  };

  render(props) {

    console.log('props', this.props)
    let list = [];
    console.log(this.props.channel);
    if (this.props.channel && this.props.channel.messages) {
      list = this.props.channel.messages.map((m) => {
        let messageBodyParams = {};
        // left for incoming, right for outgoing
        messageBodyParams.position =
          m.from != "support" ? "outgoing" : "incoming";
        messageBodyParams.type = "text";
        messageBodyParams.text = m.message;
        messageBodyParams.date = m.timestamp;
        messageBodyParams.from = m.from;
        messageBodyParams.to = m.to;
        return messageBodyParams;
      });
      console.log("list", list);
    }
    return (
      <div className="messages-panel">
        <div className="close-btn" onClick={this.props.closeHandler}>
          <AiOutlineClose color="white" size={20}  />
        </div>
        <div className="header">
          <h4 className="title">Welcome to HighFi Chat!</h4>
          <h6 className="subtitle">Ask us anything using the chat window 💭</h6>
          <div className="online-header">
            <h6>
              {" "}
              <BiRadioCircle color="green" size={18} /> We are{" "}
              {this.props.isOnline} at the moment.
            </h6>
          </div>
        </div>
        <MessageList className="message-list">
          {list.map((messageInfo) => (
            <Message
              model={{
                message: messageInfo.text,
                sentTime: format(messageInfo.date),
                sender: messageInfo.from,
                direction: messageInfo.position,
                position: "single",
              }}
            >
              {messageInfo.position === "incoming" && (
                <Avatar src={"./download.png"} />
              )}
              <Message.Header
                sender={messageInfo.from}
                sentTime={format(messageInfo.date)}
              />
            </Message>
          ))}
        </MessageList>
        <span className="powered">Powered by HighfiMe</span>
        {this.props.channel && (
          <div className="messages-input">
            <input
              type="text"
              onChange={this.handleInput}
              value={this.state.input_value}
              onKeyDown={this.handleKeypress}
              className='input'
              placeholder="Start typing..."
            />
            <button className="button" onClick={this.send}>
              <RiSendPlane2Fill color="white" size={30} />
            </button>
          </div>
        )}
      </div>
    );
  }
}
