import React from "react";
import Message from "./Message";
import { connect } from "react-redux";

function MessagesList(props) {
  return (
    <div className="messages-list">
      <ul>
        {props.messages.map((message) => (
          <li key={message.id} {...message}>
            <span>{message.from}</span>: {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    messages: state.messages.arr,
    id: state.messages.arr.id,
    from: state.messages.arr.from,
    message: state.messages.arr.message,
  };
};
export default connect(mapStateToProps)(MessagesList);
