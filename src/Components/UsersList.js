import {
  onSnapshot,
  doc,
  setDoc,
  collection,
  query,
  orderBy,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import UserItem from "./UserItem";
const UsersList = () => {
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    const usersRef = collection(db, "unregusers");
    const q = query(usersRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  const ReadMsg = async (email) => {
    navigate("Chat", { state: { mail: email } });
    const docSnap = await getDoc(doc(db, "user-unreadmsgs", email));
    if (docSnap.data() && docSnap.data().unread === true) {
      await updateDoc(doc(db, "user-unreadmsgs", email), { unread: false });
    }

    await setDoc(doc(db, "unregusers", "selected"), {
      email: email,
    });
  };
  return (
    <div>
      {users.map((userss, useritemkey) => (
        <div key={useritemkey} onClick={() => ReadMsg(userss.email)}>
          <UserItem email={userss.email} />
        </div>
      ))}
    </div>
  );
};

export default UsersList;
