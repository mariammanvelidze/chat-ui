import React, { useRef } from "react";
import { setUsername } from "../redux/actionCreators";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Home(props) {
  const userName = useRef();
  function handleSubmit(e) {
    let username = userName.current.value;
    e.preventDefault();
    if (username.trim().length < 2) {
      alert("Your username should be longer");
    } else {
      props.setUsername(username.trim());
    }
  }

  return (
    <div className="homepage">
      {!props.username && <h2>Set your username first.</h2>}
      {props.username && (
        <h2>You have already set your uername to: {props.username}.</h2>
      )}
      <h1>Choose Username</h1>
      <form onSubmit={handleSubmit} className="username-form">
        <input type="text" name="username" ref={userName} />
        <button type="submit" className="set-username">
          set username
        </button>
      </form>
      {props.username && (
        <Link to="/chat">
          <button>Go to Chat</button>
        </Link>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
