import "./Chat.css";
import React from "react";
import { MessagesBox } from "./continers/";
import { MessagesInput } from "./continers/";
import { UsersList } from "./continers/";

function Chat() {
  return (
    <div className="container">
      <section>
        {/* <HelloUser /> */}
        <button></button>
        <MessagesBox />
        <MessagesInput />
      </section>
      <section>
        <UsersList />
      </section>
    </div>
  );
}

export default Chat;
