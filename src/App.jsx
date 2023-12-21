import AdminLogin from "./components/AdminLogin";
import Home from "./components/Home";
import KullaniciSozlesmesi from "./components/KullaniciSozlesmesi";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/adminGiris" element={<AdminLogin />} />
        <Route path="/kullaniciSozlesmesi" element={<KullaniciSozlesmesi />} />
      </Routes>
    </>
  );
}

export default App;
