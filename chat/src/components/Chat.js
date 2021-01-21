import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUsername } from "../redux/actionCreators";
import SendMessage from "./SendMessage";
import Message from "./Message";
import MessagesList from "./MessagesList";
function Chat(props) {
  return (
    <div>
      <section>
        <h1>Hello, {props.username}</h1>
        <Link to="/">
          <button onClick={(e) => props.setUsername("")}>
            Logout/Change username
          </button>
        </Link>
        <MessagesList />
        <SendMessage />
      </section>
      <section>
        <div className="users-list"></div>
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
