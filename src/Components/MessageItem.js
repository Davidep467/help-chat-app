import Moment from "react-moment";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import classes from "./MessageItem.module.css";
const MessageItem = ({ msg, mail }) => {
  const Download = () => {
    getDownloadURL(ref(storage, `${msg.mediadoc}` || `${msg.mediaimg}`)).then(
      (url) => {
        window.open(url, "_blank");
      }
    );
  };

  return (
    <div>
      <div>
        {msg.message}
        {msg.mediaimg && (
          <img src={msg.mediaimg} alt="" onClick={Download} width="180px" />
        )}

        {msg.mediadoc && (
          <img alt="" 
            onClick={Download}
            width="180px"
            src="https://firebasestorage.googleapis.com/v0/b/help-chat-reactjs.appspot.com/o/assets%2Fdocicon.png?alt=media&token=65103ba2-2bf5-433b-9282-1dba45311878"
          />
        )}

        <p
          className={`${classes.Time} ${
            msg.usermail === mail ? classes.TimeUser : ""
          }`}
        >
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
