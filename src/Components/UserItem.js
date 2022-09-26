import { onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import classes from "./UserItem.module.css";
const UserItem = ({ email }) => {
  const [all, setAll] = useState("");
  const [seluser, setSeluser] = useState("");
  useEffect(() => {
    let unsubs = onSnapshot(doc(db, "user-unreadmsgs", email), (doc) => {
      setAll(doc.data());
    });
    return () => unsubs();
  }, [email]);

  useEffect(() => {
    let unsub = onSnapshot(doc(db, "unregusers", "selected"), (doc) => {
      if (doc.data()) {
        setSeluser(doc.data());
      }
      return () => unsub();
    });
  }, [email]);

  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();

      deleteDoc(doc(db, "unregusers", "selected"));
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  return (
    <div>
   {all && (  <div
      className={`${classes.LastMsg} ${
        all.unread === true ? classes.Unread : ""
      }`}
    >
     
        <div>
          <p
            className={`${classes.UnSelectedUser} ${
              seluser.email === email ? classes.SelectedUser : ""
            }`}
          >
            {email}
          </p>
        </div>
    
    </div>  )}
    </div>
  );
};

export default UserItem;
