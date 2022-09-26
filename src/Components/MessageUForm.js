import React from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import classes from "./MessageForm.module.css";
const MessageUForm = ({
  mail,
  att,
  mymessage,
  messHand,
  messSub,
  attdocHand,
  attimgHand,
}) => {
  const markRead = async () => {
    const docSnap = await getDoc(doc(db, "helper-unreadmsgs", mail));

    if (docSnap.data() && docSnap.data().unread === true) {
      await updateDoc(doc(db, "helper-unreadmsgs", mail), { unread: false });
    }
  };
  return (
    <div>
      <br />
      <br />
      <br />
      <button onClick={markRead}>Mark messages as read</button>
      <br />
      <br />
      Attach image or document{" "}
      <label htmlFor="attimg">
        <img
          className={classes.AttImage}
          alt=""
          title="Attach Image"
          src="https://firebasestorage.googleapis.com/v0/b/help-chat-reactjs.appspot.com/o/assets%2Fimage-solid.png?alt=media&token=cbdc4ad5-4924-4515-abdc-d98faed3ec74"
        />
      </label>
      <label htmlFor="attdoc">
        <img
          className={classes.AttImage}
          alt=""
          title="Attach Document"
          src="https://firebasestorage.googleapis.com/v0/b/help-chat-reactjs.appspot.com/o/assets%2Fdocument.png?alt=media&token=3f3ab6af-cb52-470c-866d-1c9aba8c8877"
        />
      </label>
      <input
        style={{ display: "none" }}
        value=""
        type="file"
        id="attimg"
        accept=".jpg, .png, .gif"
        onChange={attimgHand}
      />
      <input
        style={{ display: "none" }}
        value=""
        type="file"
        id="attdoc"
        accept=".pdf"
        onChange={attdocHand}
      />
      <form className={classes.FormContainer} onSubmit={messSub}>
        <div>
          <textarea
            type="text"
            className={classes.TextInput}
            maxLength="300"
            value={mymessage}
            onChange={messHand}
            required={!att}
          />

          <button className={classes.SendButton}>Send</button>
        </div>
      </form>
    </div>
  );
};

export default MessageUForm;
