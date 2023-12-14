import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        {/* <Route path="/" element={<Home/>}/> */}
      </Routes>
    </>
  );
}

export default App;
