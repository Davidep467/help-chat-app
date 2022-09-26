import {
  addDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
  Timestamp,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db, storage } from "../firebase";
import { useLocation } from "react-router-dom";
import MessageItem from "./MessageItem";
import MessageUForm from "./MessageUForm";
import ConfModal from "./ConfModal";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import MsgNotification from "./MsgNotification";
import styles from "./UserChat.module.css";
const UserChat = () => {
  const bottomRef = useRef(null);
  const { state } = useLocation();
  const [msgs, setMsgs] = useState([]);
  const { mail, username } = state;
  const [mymessage, setMyMessage] = useState([]);
  const [att, setAtt] = useState("");
  const [attdocurl, setAttdocurl] = useState("");
  const [attimgurl, setAttimgurl] = useState("");
  const [chatwith, setChatwith] = useState("");
  useEffect(() => {
    const msgsRef = collection(db, "unregusers", "messages", mail);
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];

      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
  }, [mail]);

  const attdocHand = async (event) => {
    setAtt(event.target.files[0]);
    let url;

    if (event.target.files[0]) {
      const attRef = ref(storage, `${mail}/${event.target.files[0].name}`);

      const snap = await uploadBytes(attRef, event.target.files[0]);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
      setAttdocurl(url);
    }
  };

  const attimgHand = async (event) => {
    setAtt(event.target.files[0]);
    let url;

    if (event.target.files[0]) {
      const attRef = ref(storage, `${mail}/${event.target.files[0].name}`);

      const snap = await uploadBytes(attRef, event.target.files[0]);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
      setAttimgurl(url);
    }
  };

  const messHand = (event) => {
    setMyMessage(event.target.value);
  };

  const messSub = async (event) => {
    event.preventDefault();

    await addDoc(collection(db, "unregusers", "messages", mail), {
      email: mail,
      message: mymessage,
      createdAt: Timestamp.fromDate(new Date()),
      mediadoc: attdocurl,
      mediaimg: attimgurl,
    });
    setMyMessage("");
    setAtt("");
    setAttdocurl("");
    setAttimgurl("");
    const docSnap = await getDoc(doc(db, "helper-unreadmsgs", mail));

    if (docSnap.data() && docSnap.data().unread === true) {
      await updateDoc(doc(db, "helper-unreadmsgs", mail), { unread: false });
    }
    await setDoc(doc(db, "user-unreadmsgs", mail), {
      email: mail,
      createdAt: Timestamp.fromDate(new Date()),
      unread: true,
      message: mymessage,
      mediadoc: attdocurl,
      mediaimg: attimgurl,
    });
  };

  const delAtt = () => {
    const DelRef = ref(storage, `${attdocurl}` || `${attimgurl}`);

    deleteObject(DelRef)
      .then(() => {
        setAtt("");
        setAttdocurl("");
        setAttimgurl("");
      })
      .catch((error) => {
        console.log("// Uh-oh, an error occurred!");
      });
  };

  const goToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let unsubwith = onSnapshot(doc(db, "helper-unreadmsgs", mail), (doc) => {
      if (doc.data()) {
        setChatwith(doc.data().helpermail);
      }
      return () => unsubwith();
    });
  }, [mail]);

  return (
    <div>
      {att && (
        <div className={styles.ModalContainer}>
          <ConfModal
            attdocurl={attdocurl}
            attimgurl={attimgurl}
            delAtt={delAtt}
            messSub={messSub}
          />
        </div>
      )}
      <div className={styles.Notification}>
        <MsgNotification mail={mail} />
      </div>
      <button className={styles.BottomBut} onClick={goToBottom}>
        &#10515;
      </button>
      <div className={styles.ChatContainer}>
        <p>
          Hi <b> {username}</b>,{" "}
          {chatwith && <font> you are chatting with <u>{chatwith}</u> </font>}
        </p>
        <br />
        <div>
          {msgs.map((msg, messageitemkey) => (
            <div
              key={messageitemkey}
              className={`${styles.Size} ${
                msg.usermail === mail ? styles.Shifted : ""
              }`}
            >
              <div
                className={`${styles.MessageUser} ${
                  msg.usermail === mail ? styles.MessageHelper : ""
                }`}
              >
                <MessageItem mail={mail} msg={msg} />
              </div>
            </div>
          ))}
        </div>
        <div ref={bottomRef}>
          <MessageUForm
            attdocHand={attdocHand}
            attimgHand={attimgHand}
            messSub={messSub}
            mymessage={mymessage}
            att={att}
            messHand={messHand}
            mail={mail}
          />
        </div>
      </div>
    </div>
  );
};

export default UserChat;
