import AdminLogin from "./components/AdminLogin";
import Home from "./components/Home";
import KullaniciSozlesmesi from "./components/KullaniciSozlesmesi";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Login from "./components/Login";


import { Routes, Route } from "react-router-dom";
import BookDetail from "./components/BookDetail";
import Basket from "./components/Basket"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/adminGiris" element={<AdminLogin />} />
        <Route path="/kullaniciSozlesmesi" element={<KullaniciSozlesmesi />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="book/:bookId" element={<BookDetail/>} />
        <Route path="/basket" element={<Basket/>}/>
        {/* <Route path="/" element={<Home/>}/> */}
      </Routes>
    </>
  );
}

export default App;
