import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { CreateAccountForm } from "./CreateAccountForm";

const ConversationTopics = ({ setCurrentTab }) => {
  const { state, topicHandler, handleCreateAccount, handleCreateGuestID } = useAuth();
  const { topic, accessToken } = state;

  const bg = !topic ? "#8EBDE6" : "#2C5282";

  useEffect(() => {
    if (state.isLoggedIn) {
      setCurrentTab(3)
    }
  }, []);


  return (
    <>
      <div className="questions">
        <p>Choose topic for the conversation: </p>
        <label className="question">
          <input
            type="radio"
            name="topic"
            value={"transaction"}
            onClick={topicHandler}
            id='transaction'
          />
          <span>Unsuccesfull transaction</span>
        </label>
        <label className="question">
          <input
            type="radio"
            name="topic"
            value={"support"}
            onClick={topicHandler}
          />
          <span>Connect support rightaway</span>
        </label>
        <label className="question">
          <input
            type="radio"
            name="topic"
            value={"wallet"}
            onClick={topicHandler}
          />
          <span>Cannot see my old data using the same wallet</span>
        </label>
        <label className="question">
          <input
            type="radio"
            name="topic"
            value={"other"}
            onClick={topicHandler}
          />
          <span>Other</span>
        </label>
      </div>
      <div className="footer">
        <>
          <button
            className="next-btn"
            style={{ backgroundColor: bg }}
            onClick={() => setCurrentTab(2)}
          >
            Next
          </button>
          <button
            className="next-btn"
            style={{ backgroundColor: bg }}
            onClick={() => handleCreateGuestID(accessToken)}
          >
            Connect Immediately
          </button>
          <CreateAccountForm
            title={"Connect Wallet"}
            createAccount={handleCreateAccount}
            setCurrentTab={setCurrentTab}
          />
        </>
      </div>
    </>
  );
};

export default ConversationTopics;
