import React, { useRef, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import Message from "./Messages/Message";
import { BsPlusSquareFill } from 'react-icons/bs';
import Compress from "compress.js";
const MessageList = () => {
  const [input, setInput] = useState("");
  const { handleSendMessage, state, address } = useAuth();
  const containerRef = useRef(null);
  const inputFileRef = useRef();
  const send = () => {
    if (input && input !== "") {
      handleSendMessage(address, input);
      setInput("");
    }
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      send();
    }
  };
  const handleChangeFile = (e) => {
    const compress = new Compress();
    const images = [...e.target.files];
    const reader = new FileReader();
    if(images[0]) {
        reader.onload = (e) => {
            compress.compress(images, { size: 1}).then(results  => {
                const img1 = results[0]
                const base64str = img1.data
                const imgExt = img1.ext
                const compressedImg = Compress.convertBase64ToFile(base64str, imgExt) 
                return handleSendMessage(address, '',{ file: compressedImg, name: images[0].name});
            })
         }
         reader.readAsDataURL(images[0]);
    }          
  }
  const handleSelectFile = () => inputFileRef.current.click();

  React.useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
    //bottomRef.current
    if (containerRef && containerRef.current) {
      console.log("postoji");
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [state.messages]);

  return (
    <>
      <div className="messageList" ref={containerRef}>
        {!state.messages.length && (
          <>
            <div className="icon">
              <AiFillInfoCircle size={40} />
            </div>
            <h4>How we can help?</h4>
            <p>
              Try to explain as much detail as possible to let our experts
              process everything faster.
            </p>
          </>
        )}

        {state.messages.length > 0 &&
          state.messages.map((msg, index) => {
            return <Message msg={msg} key={index} />;
          })}
      </div>
      <div className="footer-chat">
        <div className="send-div">
          <div className="plus">
            <BsPlusSquareFill style={{fontSize: 15, color: '#3182CE'}} onClick={handleSelectFile}/>
            <input type="file" accept="image/jpg" hidden ref={inputFileRef} onChange={handleChangeFile}/>
          </div>
          <input
            type="text"
            placeholder="Send message..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={onEnter}
          />
          <button className="sendBtn" onClick={send}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageList;
