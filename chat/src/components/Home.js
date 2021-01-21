import React, { useRef } from "react";
import { setUsername } from "../redux/actionCreators";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Home(props) {
  function handleSubmit(e) {
    let username = userName.current.value;
    e.preventDefault();
    if (username.trim().length < 2) {
      alert(1);
    } else {
      props.setUsername(username.trim());
    }
  }

  const userName = useRef();
  return (
    <div className="homepage">
      <h1>Choose Username</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" ref={userName} />
        {/* <Link to="/chat"> */}
        <button type="submit" className="set-username">
          set username
        </button>
        {/* </Link> */}
      </form>
      <Link to="/chat">
        <button>Go to Chat</button>
      </Link>
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
