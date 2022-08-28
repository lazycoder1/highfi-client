import React from "react";
import Header from "./Header";
import "./layout.scss";

const Layout = ({ children, setCurrentTab }) => {
  return (
    <div className="chat-layout">
      <Header setCurrentTab={setCurrentTab} />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;

// WE NEED THIS FOR LATER

// <div className="footer">
// {logout && (
//   <>
//     <button style={{ backgroundColor: bg }} className="next-btn">
//       New Conversation
//     </button>
//     <button className="connect-btn" onClick={logoutHandler}>
//       Logout
//     </button>
//   </>
// )}

// {!logout && loc !== "/messages" && (
//   <>
//     <Link
//       to={topic ? "/messages" : "/"}
//       style={{ backgroundColor: bg }}
//       className="next-btn"
//       aria-disabled={true}
//     >
//       {btn1 || "Next"}
//     </Link>
//     <CreateAccountForm
//       title={btn2}
//       createAccount={createAccount}
//       isLogged={logout}
//     />
//   </>
// )}

// {loc === "/messages" && (
//   <div className="send-div">
//     <div className="plus">+</div>
//     <input type="text" placeholder="Send message..."/>
//     <button className="sendBtn">Send</button>
//   </div>
// )}
// </div>
