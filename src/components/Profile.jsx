import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../Store/authSlice";

function Profile() {
  const { currentUser } = useSelector(selectAuth);

  return (
    <div className="h-screen w-screen bg-loginBack flex flex-col items-center justify-center text-slate-100">
      <h2 className="text-title text-2xl font-bold mb-4">Hesap Bilgilerim</h2>
      <div className="bg-loginBack border-2 border-title p-8 rounded-lg shadow-md w-80 h-80 flex flex-col  justify-center">
        <p className="text-title text-white mb-2">Ad: {currentUser.firstName}</p>
        <p className="text-title text-white mb-2">Soyad: {currentUser.lastName}</p>
        <p className="text-title text-white mb-2">E-posta: {currentUser.email}</p>
      </div>
    </div>
  );
}

export default Profile;
