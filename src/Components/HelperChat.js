import { useContext } from "react";
import UsersList from "./UsersList";
import { AuthContext } from "../store/auth";
import Chat from "./Chat";
import styles from "./HelperChat.module.css";
import { Route, Routes } from "react-router-dom";
const HelperChat = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.Container}>
      <aside className={styles.UserList}>{user && <UsersList />}</aside>
      <main className={styles.Chat}>
        <Routes>
          <Route path="Chat" element={<Chat />} />
        </Routes>
      </main>
    </div>
  );
};

export default HelperChat;
