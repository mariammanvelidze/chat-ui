import React, { useRef } from "react";
import { connect } from "react-redux";
import { sendMessage, receiveMessage } from "../redux/actionCreators";

let ws = new WebSocket("ws://chat.shas.tel");
function SendMessage(props) {
  const messageToSend = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    let message = messageToSend.current.value;
    if (message) {
      ws.send(
        JSON.stringify({
          from: props.username,
          message,
        })
      );
    }
    messageToSend.current.value = "";
  }

  function setDocTitle() {
    document.title = "Chat";
  }

  function scrollDown() {
    document.getElementsByClassName(
      "messages-list"
    )[0].scrollTop = document.getElementsByClassName(
      "messages-list"
    )[0].scrollHeight;
  }

  ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      props.sendMessage(data[i].from, data[i].message);
    }
    if (document.hidden) {
      document.title = "New Unread Messages";
    }
    scrollDown();
  };

  return (
    <div className="input-field">
      <form onSubmit={handleSubmit} className="message-input">
        <input
          type="text"
          autoComplete="off"
          name="message"
          placeholder="Type a message..."
          ref={messageToSend}
          onFocus={setDocTitle}
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
