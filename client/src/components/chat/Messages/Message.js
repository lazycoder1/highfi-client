import React from "react";
import { BsFillSquareFill } from "react-icons/bs";
import ImageModal from "../../ui/image-modal";

const Message = ({ msg }) => {
  console.log(msg)
  const position = msg.to !== "support" ? "receiver" : "sender";

  const name =
    msg.from && msg.from.length > 10
      ? msg.from.slice(0, 10) + "..."
      : msg.from;

  var date = new Date(msg.timestamp);

  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2);

  let address = msg.address && msg.address.slice(0,10) + '...'

  return (
    <div className={`msg ${position}`}>
      <div className="img">
        <BsFillSquareFill size={25} color={"pink"} />
      </div>
      <div className="info">
        <div className="header">
          <span className="name">{name || address}</span>
          <span>{formattedTime}</span>
        </div>
        <div className="body">
          <div className="text">
            {
              msg.message ? msg.message : <ImageModal src={msg.photoUrl}/>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
