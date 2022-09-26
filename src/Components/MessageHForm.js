import React from "react";
import classes from "./MessageForm.module.css";
const MessageHForm = ({
  att,
  helmessage,
  messHand,
  messSub,
  attdocHand,
  attimgHand,
}) => {
  return (
    <div>
      <br />
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
            value={helmessage}
            onChange={messHand}
            required={!att}
          />

          <button className={classes.SendButton}>Send</button>
        </div>
      </form>
    </div>
  );
};

export default MessageHForm;
