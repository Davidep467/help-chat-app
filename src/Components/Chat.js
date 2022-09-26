import {
  addDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
  Timestamp,
  setDoc,
  updateDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect, useContext, useRef } from "react";
import MessageHForm from "./MessageHForm";
import { db, storage } from "../firebase";
import { AuthContext } from "../store/auth";
import MessageItem from "./MessageItem";
import Loading from "./Loading";
import styles from "./Chat.module.css";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { useLocation } from "react-router-dom";
import ConfModal from "./ConfModal";
const Chat = () => {
  const { state } = useLocation();
  const { mail } = state;
  const [msgs, setMsgs] = useState([]);
  const [usermail, setUsermail] = useState("");
  const [helmessage, setMessage] = useState([]);
  const [att, setAtt] = useState("");
  const [attdocurl, setAttdocurl] = useState("");
  const [attimgurl, setAttimgurl] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const bottomRef = useRef(null);
  //READ MESSAGES
  useEffect(() => {
    setLoading(true);
    setUsermail(mail);
    const msgsRef = collection(db, "unregusers", "messages", mail);

    const queriest = query(msgsRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(queriest, (querySnapshot) => {
      let msgs = [];

      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
      setLoading(false);
      setUsers();
    });
    const fetchData = async () => {
      const docSnap = await getDoc(doc(db, "unreadmsgs", mail));
      if (docSnap.data() && docSnap.data().unread === true) {
        await updateDoc(doc(db, "unreadmsgs", mail), { unread: false });
      }
    };
    fetchData().catch(console.error);

    return () => unsub();
  }, [mail]);

  //SEND MESSAGES

  const attdocHand = async (event) => {
    setAtt(event.target.files[0]);
    let url;

    if (event.target.files[0]) {
      const attRef = ref(
        storage,
        `${helpermail}/${mail}/${event.target.files[0].name}`
      );

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
      const attRef = ref(
        storage,
        `${helpermail}/${mail}/${event.target.files[0].name}`
      );

      const snap = await uploadBytes(attRef, event.target.files[0]);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
      setAttimgurl(url);
    }
  };

  const helpermail = user.email;
  const messHand = (event) => {
    setMessage(event.target.value);
  };

  const messSub = async (event) => {
    event.preventDefault();

    await addDoc(collection(db, "unregusers", "messages", usermail), {
      helpermail: helpermail,
      usermail: mail,
      message: helmessage,
      createdAt: Timestamp.fromDate(new Date()),
      mediadoc: attdocurl,
      mediaimg: attimgurl,
    });
    setMessage("");
    setAtt("");
    setAttdocurl("");
    setAttimgurl("");

    await setDoc(doc(db, "helper-unreadmsgs", mail), {
      helpermail: helpermail,
      usermail: mail,
      createdAt: Timestamp.fromDate(new Date()),
      unread: true,
      message: helmessage,
      mediadoc: attdocurl,
      mediaimg: attimgurl,
    });

    const docSnap = await getDoc(doc(db, "user-unreadmsgs", mail));

    if (docSnap.data() && docSnap.data().unread === true) {
      await updateDoc(doc(db, "user-unreadmsgs", mail), { unread: false });
    }
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

  return (
    <div>
      {att && (
        <div className={styles.ModalContainer}>
          <ConfModal
            attdocurl={attdocurl}
            attimgurl={attimgurl}
            delAtt={delAtt}
            messSub={messSub}
          />{" "}
        </div>
      )}
      <main>
        <button className={styles.BottomBut} onClick={goToBottom}>
          &#10515;
        </button>

        <div className={styles.With}>
          {" "}
          <h2>{mail}</h2>
        </div>

        <div className={styles.ChatContainer}>
          {loading ? (
            <div className={styles.LoadingContainer}>
              {" "}
              <Loading />{" "}
            </div>
          ) : (
            msgs.map((msg, messageitemkey) => (
              <div
                key={messageitemkey}
                className={`${styles.Size} ${
                  msg.usermail !== mail ? styles.Shifted : ""
                }`}
              >
                <div
                  className={`${styles.MessageUser} ${
                    msg.usermail !== mail ? styles.MessageHelper : ""
                  }`}
                >
                  <MessageItem msg={msg} />
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef}>
            {!users && (
              <MessageHForm
                messSub={messSub}
                helmessage={helmessage}
                att={att}
                messHand={messHand}
                attdocHand={attdocHand}
                attimgHand={attimgHand}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
