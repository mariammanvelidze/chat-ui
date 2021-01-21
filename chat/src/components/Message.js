import React from "react";
import { connect } from "react-redux";

function Message(props) {
  return (
    <div>
      <p>
        <span>{props.from}</span>: {props.message}
      </p>
    </div>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     id: state.messages.arr.id,
//     from: state.messages.arr.from,
//     message: state.messages.arr.message,
//   };
// };
export default Message;
