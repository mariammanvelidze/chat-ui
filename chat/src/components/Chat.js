import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUsername } from "../redux/actionCreators";
import SendMessage from "./SendMessage";
import MessagesList from "./MessagesList";

function Chat(props) {
  const [WSState, setWSState] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://chat.shas.tel");
    ws.onopen = () => {
      setWSState(ws);
    };

    return () => {
      ws.close();
    };
  }, [props.username]);
  return (
    <section className="chat-section">
      <div className="username-logout">
        <h1>
          Hello, <span className="username-color">{props.username}</span>
        </h1>
        <Link to="/">
          <button onClick={(e) => props.setUsername("")}>Logout</button>
        </Link>
      </div>
      <MessagesList />
      {WSState && <SendMessage ws={WSState} />}
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    messages: state.messages.arr,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username) => dispatch(setUsername(username)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
