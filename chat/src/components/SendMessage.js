import React, { useRef } from "react";
import { connect } from "react-redux";
import { sendMessage, receiveMessage } from "../redux/actionCreators";
import { SEND_MESSAGE } from "../redux/messages/actionTypes";

import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
const ws = new WebSocket("ws://localhost:3001");
function SendMessage(props) {
  const messageToSend = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    let message = messageToSend.current.value;
    ws.send(JSON.stringify(props.sendMessage(props.username, message)));
    messageToSend.current.value = "";
  }

  ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    store.addNotification({
      title: "You've got a new message",
      message: `${data.from}: ${data.message}`,
      type: "warning",
      container: "top-right",
      insert: "top",
      dismiss: {
        duration: 2000,
      },
    });
    switch (data.type) {
      case SEND_MESSAGE:
        props.receiveMessage(data.from, data.message);
        console.log("recive message");
        break;
      default:
        break;
    }
  };

  return (
    <div className="input-field">
      <form onSubmit={handleSubmit} className="message-input">
        <input
          type="text"
          autoComplete="off"
          name="message"
          ref={messageToSend}
        />
        <button type="submit" className="sendButton">
          send
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages.arr,
    messagesState: state.messages,
    username: state.user.username,
    from: state.messages.arr.from,
    message: state.messages.arr.messaage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (from, message) => dispatch(sendMessage(from, message)),
    receiveMessage: (from, message) => dispatch(receiveMessage(from, message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
