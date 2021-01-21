import React, { useRef } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../redux/actionCreators";

function SendMessage(props) {
  const messageToSend = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    let message = messageToSend.current.value;
    props.sendMessage(props.username, message);
    messageToSend.current.value = "";
  }
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
