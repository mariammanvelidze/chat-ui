import React from "react";
import { connect } from "react-redux";
import v4 from "node-uuid";

function MessagesList(props) {
  return (
    <div className="messages-list">
      <ul>
        {props.messages.map((message) => (
          <li key={v4()} {...message}>
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
