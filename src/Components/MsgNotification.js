import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
const MsgNotification = ({ mail }) => {
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    let unsubs = onSnapshot(doc(db, "helper-unreadmsgs", mail), (doc) => {
      console.log(doc.data());
      if (doc.data() && doc.data().unread === true) {
        setNotification(true);
      } else {
        setNotification(false);
      }
    });
    return () => unsubs();
  }, [mail]);

  return (
    <div>
      {notification ? (
        <div>
          <h2>NEW MESSAGE</h2>
        </div>
      ) : null}
    </div>
  );
};

export default MsgNotification;
