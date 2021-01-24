import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUsername } from "../redux/actionCreators";
import SendMessage from "./SendMessage";
import MessagesList from "./MessagesList";
import ReactNotifications from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
function Chat(props) {
  return (
    <div>
      <ReactNotifications />
      <section className="chat-section">
        <div className="username-logout">
          <h1>
            Hello, <span className="username-color">{props.username}</span>
          </h1>
          <Link to="/">
            <button onClick={(e) => props.setUsername("")}>
              Logout/Change username
            </button>
          </Link>
        </div>
        <MessagesList />
        <SendMessage />
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username) => dispatch(setUsername(username)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
