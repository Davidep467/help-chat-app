import { doc, addDoc, setDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import classes from "./UserChatLogin.module.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserChatLogin = () => {
  let navigate = useNavigate();
  const [uname, setName] = useState("");
  const [inputemail, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const nameHand = (event) => {
    setName(event.target.value);
  };

  const emailHand = (event) => {
    emails.replace(/ /g, "");
    setEmail(event.target.value);
  };

  const messHand = (event) => {
    setMessage(event.target.value);
  };
  const emails = inputemail.replace(/ /g, "");
  const writeData = async (event) => {
    event.preventDefault();

    await addDoc(collection(db, "unregusers", "messages", emails), {
      username: uname,
      email: emails,
      message: message,
      createdAt: Timestamp.fromDate(new Date()),
      media: "",
    });

    await setDoc(doc(db, "unregusers", emails), {
      email: emails,
      createdAt: Timestamp.fromDate(new Date()),
    });

    await setDoc(doc(db, "user-unreadmsgs", emails), {
      email: emails,
      createdAt: Timestamp.fromDate(new Date()),
      unread: true,
      message: message,
      media: "",
    });

    navigate("/UserChat", {
      state: { mail: emails, username: uname, message: message },
    });
  };
  return (
    <div>
      <h1 className={classes.Fill}>Fill in the form and start chatting</h1>
      <form className={classes.StartForm} onSubmit={writeData}>
        <h3>Name</h3>
        <input
          className={classes.NameField}
          type="text"
          value={uname}
          onChange={nameHand}
          required
        />
        <h3>E-Mail</h3>
        <input
          className={classes.MailField}
          type="email"
          value={inputemail}
          onChange={emailHand}
          required
        />

        <h3>Message</h3>
        <textarea
          className={classes.MessageField}
          maxlength="300"
          type="text"
          value={message}
          onChange={messHand}
          required
        />
        <div className={classes.StartChatButton}>
          <button>Start Chat</button>
        </div>
      </form>
    </div>
  );
};

export default UserChatLogin;
