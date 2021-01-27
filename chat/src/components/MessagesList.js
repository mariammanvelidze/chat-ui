import React from "react";
import { connect } from "react-redux";
import v4 from "node-uuid";
function MessagesList(props) {
  const renderMessage = (message) => {
    let username = props.username;
    if (username === message.from) {
      return (
        <li key={v4()} {...message} className="sent-by-me">
          {/* <span className="message-user">{message.from}</span> */}
          <span className="message-text"> {message.message}</span>
        </li>
      );
    } else {
      return (
        <li key={v4()} {...message}>
          <span className="message-user">{message.from}</span>
          <span className="message-text"> {message.message}</span>
        </li>
      );
    }
  };

  return (
    <div className="messages-list">
      <ul>{props.messages.map((message) => renderMessage(message))}</ul>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    messages: state.messages.arr,
    id: state.messages.arr.id,
    from: state.messages.arr.from,
    username: state.user.username,
    message: state.messages.arr.message,
  };
};
export default connect(mapStateToProps)(MessagesList);
