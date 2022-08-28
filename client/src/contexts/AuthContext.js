import { createContext, useContext, useEffect, useRef, useState } from "react";
import socketClient from "socket.io-client";

// const SERVER = "https://dashboard.highfi.me";
const SERVER = "http://localhost:3000"

const AuthContext = createContext(null);

// SO HERE WE DO LOGIC FOR AUTHENTICATION
// try do implement logic here

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    messages: [],
    socket: null,
    isLoggedIn: false,
    isOnline: "offline",
    accessToken: "some-token",
    socketLoaded: false,
    topic: null,
  });
  const [address, setAddress] = useState('');

  const [currentTab, setCurrentTab] = useState(1);

  const socket = useRef();
  const messages = useRef([]);

  const handleCreateAccount = (address, accessToken) => {
    socket.current.emit("create-account", {
      userAddress: address,
      accessToken,
    });
    setState({ ...state, accessToken });
    setAddress(address);
  };
  const handleCreateGuestID = (accessToken) => {
    if(!address) {
      socket.current.emit("create-guest-id", {
        accessToken
      })
    }
  }
  const handleChannelSelect = (address) => {
    fetch(
      SERVER +
        "/chat/getMessages?address=" +
        address +
        "&accessToken=" +
        state.accessToken
    ).then(async (response) => {
      let data = await response.json();
      messages.current = data.messages;
      let isLoggedIn = true;
      setState({
        ...state,
        messages: messages.current,
        isLoggedIn,
        address: address,
      });
    });
  };

  const configureSocket = () => {
    socket.current = socketClient(SERVER);

    socket.current.emit("test", "isOnline"); //testing if support-dashboard is online
    socket.current.on("response", (arg) => {
      //response from the support-dashboard if online
      setState({ ...state, isOnline: "online" });
    });

    socket.current.on("connection", () => {
      if (address) {
        handleChannelSelect(address);
        localStorage.setItem("address", JSON.stringify(address));
      }
    });

    socket.current.on("message", (message) => {
      messages.current = [...messages.current, message];
      setState({ ...state, messages: messages.current });
    });

    socket.current.on("new-account", (data) => {
      if (data.userAddress == null || data.userAddress === "") {
        return;
      }
      setState({ ...state, isLoggedIn: true });
      setAddress(data.userAddress)
      handleChannelSelect(data.userAddress);
      //redirect to tab3
      setCurrentTab(3);
    });
   /*  socket.current.on("guest-id", (data) => {
      setState({ ...state, isLoggedIn: true });
      setAddress(data.guestID)
      handleChannelSelect(data.guestID);
      //redirect to tab3
      setCurrentTab(3);
    } ) */
  };

  const handleSendMessage = (address, text) => {
    socket.current.emit("send-message", {
      id: Date.now(),
      address: address,
      accessToken: state.accessToken,
      message: text,
      to: "support",
      from: address,
      timestamp: +new Date(),
    });
  };

  useEffect(() => {
    configureSocket();
    window.addEventListener("message", function (e) {
      const data = e.data;
      if (data !== null && data?.address) {
        handleCreateAccount(data.address.toLowerCase(), data.accessToken);
      }
    });
    window.parent.postMessage("Send me my creds !", "*");
  }, []);

  console.log("AUTH", state);

  const topicHandler = (e) => {
    setState({ ...state, topic: e.target.value });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        address,
        topicHandler,
        handleCreateAccount,
        handleSendMessage,
        currentTab,
        setCurrentTab,
        handleCreateGuestID
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Please wrapp <App /> component within <AuthProvider>!");
  }
  return context;
};
