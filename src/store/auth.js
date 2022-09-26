import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../Components/Loading";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUserr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserr(user);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "200px" }}>
       
        <Loading />
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
