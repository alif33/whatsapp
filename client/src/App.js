import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPass from "./pages/resetForgotPages/ResetPass";
import ForgetPass from "./pages/resetForgotPages/ForgetPass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/forget-password" element={<ForgetPass />} />
        <Route path="/chat-list" element={<ChatList />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
