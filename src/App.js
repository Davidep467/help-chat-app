import HomeList from "./Components/HomeList";
import HelperChat from "./Components/HelperChat";
import UserChatLogin from "./Components/UserChatLogin";
import UserChat from "./Components/UserChat";
import Article from "./Components/Article";
import HelperLogin from "./Components/HelperLogin";
import NavBar from "./Layout/NavBar";
import NotFound from "./Components/NotFound";
import { Route, Routes, Outlet } from "react-router-dom";
import AuthProvider from "./store/auth";
function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
        
          
          <Route
            element={
              <>
                <NavBar />
                <Outlet />
              </>
            }
          >
            <Route path="/" element={<HomeList />} />
            <Route path="/HelperChat/*" element={<HelperChat />} />
            <Route path="/Article" element={<Article />} />
            <Route path="/HelperLogin" element={<HelperLogin />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/UserChatLogin" element={<UserChatLogin />} />
          <Route path="/UserChat" element={<UserChat />} />
           
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
