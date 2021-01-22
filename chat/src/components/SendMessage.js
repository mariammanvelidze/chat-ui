import React, { useRef } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../redux/actionCreators";
import { SEND_MESSAGE } from "../redux/messages/actionTypes";

function SendMessage(props) {
  const messageToSend = useRef();
  const ws = new WebSocket("ws://localhost:3001");
  ws.addEventListener("open", () => {});
  function handleSubmit(e) {
    e.preventDefault();
    let message = messageToSend.current.value;
    props.sendMessage(props.username, message);
    const data = {
      username: props.username,
      message: message,
    };
    ws.send(JSON.stringify(data));
    messageToSend.current.value = "";
  }

  // ws.addEventListener("opens", () => {
  //   console.log("here we are");
  //    ws.send("hey there");
  // });

  ws.onmessage = (message) => {
    console.log(JSON.parse(message.data));
    const data = JSON.parse(message.data);
    props.sendMessage(data.username, data.message);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" ref={messageToSend} />
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
