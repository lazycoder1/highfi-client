import React, { useEffect } from "react";
import "./App.scss";
import ConnectingWallet from "./components/chat/ConnectingWallet";
import ConversationTopics from "./components/chat/ConversationTopics";
import Layout from "./components/chat/Layout/Layout";
import MessageList from "./components/chat/MessageList";
import { useAuth } from "./contexts/AuthContext";

function App() {
  // on this way you can access to global state from every component
  const { state, currentTab, setCurrentTab } = useAuth();

  useEffect(() => {
    if (!state.accessToken) {
      setCurrentTab(1);
    }
  }, [currentTab]);

  return (
    <>
      <Layout setCurrentTab={setCurrentTab}>
        {currentTab === 1 && (
          <ConversationTopics setCurrentTab={setCurrentTab} />
        )}
        {currentTab === 2 && <ConnectingWallet setCurrentTab={setCurrentTab} />}
        {currentTab === 3 && <MessageList />}
      </Layout>
    </>
  );
}

export default App;
