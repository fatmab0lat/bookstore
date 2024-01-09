import { React, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../Store/authSlice";
import api from "../api";

function Profile() {
  const { currentUser } = useSelector(selectAuth);
  const [isClickedF, setIsClickedF] = useState(false);
  const [isClickedL, setIsClickedL] = useState(false);
  const [isClickedE, setIsClickedE] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleClickF = (e) => {
    e.preventDefault();
    setIsClickedF(true);
  };

  const handleClickL = (e) => {
    e.preventDefault();
    setIsClickedL(true);
  };

  const handleClickE = (e) => {
    e.preventDefault();
    setIsClickedE(true);
  };

  const handleFirstnameChange = (e) => {
    e.preventDefault();
    setNewFirstName(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setNewLastName(e.target.value);
    console.log(newLastName);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSubmitButtonF = (e) => {
    setIsClickedF(false);
  };

  const handleSubmitButtonL = (e) => {
    setIsClickedL(false);
  };

  const handleSubmitButtonE = (e) => {
    setIsClickedE(false);
  };

  const handleFNFormSubmit = async (event) => {
    event.preventDefault();
    setIsClickedF(false);
    const path = "/users/" + currentUser.id;
    try {
      const response = await api.put(path, {
        firstName: newFirstName,
      });
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log("response error: " + error.response.data);
      }
      console.error("Error:", error);
      throw new Error("User firstName update failed");
    }
    // fetchUsers();
    setNewFirstName("");
  };

  return (
    <div className="h-screen w-screen bg-loginBack flex flex-col items-center justify-center  text-white">
      <h2 className="text-title text-2xl font-bold mb-4">HESAP BİLGİLERİM</h2>
      <div className="bg-loginBack w-screen h-1/2 flex flex-col justify-around items-center">
        {isClickedF ? (
          <div>
            <form onSubmit={handleFNFormSubmit}>
              <label>Ad:</label>
              <input
                value={newFirstName}
                placeholder="Adınızı Giriniz"
                type="text"
                onChange={handleFirstnameChange}
                className="text-black rounded-lg p-1 w-80 ml-4"
              />
              <button
                type="button"
                onClick={handleFNFormSubmit}
                className="border-2 border-red-600 bg-red-600 hover:scale-110 text-white pt-1 pb-1 pl-4 pr-4 rounded-xl ml-3 text-sm"
              >
                Kaydet
              </button>
            </form>
          </div>
        ) : (
          <div className="flex justify-evenly border-2 border-title p-4 rounded-lg shadow-md w-1/3">
            <p>Ad:</p>
            <p className="mb-2">{currentUser.firstName}</p>
            <button
              onClick={handleClickF}
              className="border-2 border-green-500 bg-green-500 hover:scale-110 text-white pt-1 pb-1 pl-4 pr-4 rounded-xl ml-3 text-sm"
            >
              Güncelle
            </button>
          </div>
        )}
        {isClickedL ? (
          <div>
            <form>
              <label>Soyad:</label>
              <input
                value={newLastName}
                placeholder="Soyadınızı Giriniz"
                type="text"
                onChange={handleLastnameChange}
                className="text-black rounded-lg p-1 w-80 ml-4"
              />
              <button
                onClick={handleSubmitButtonL}
                className="border-2 border-red-600 bg-red-600 hover:scale-110 text-white pt-1 pb-1 pl-4 pr-4 rounded-xl ml-3 text-sm"
              >
                Kaydet
              </button>
            </form>
          </div>
        ) : (
          <div className="flex justify-evenly border-2 border-title p-4 rounded-lg shadow-md w-1/3">
            <p>Soyad:</p>
            <p className="mb-2">{currentUser.lastName}</p>
            <button
              onClick={handleClickL}
              className="border-2 border-green-500 bg-green-500 hover:scale-110 text-white pt-1 pb-1 pl-4 pr-4 rounded-xl ml-3 text-sm"
            >
              Güncelle
            </button>
          </div>
        )}
        {isClickedE ? (
          <div>
            <form>
              <label>Email:</label>
              <input
                value={newEmail}
                placeholder="Mail Adresinizi Giriniz"
                type="text"
                onChange={handleEmailChange}
                className="text-black rounded-lg p-1 w-80 ml-4"
              />
              <button
                onClick={handleSubmitButtonE}
                className="border-2 border-red-600 bg-red-600 hover:scale-110 text-white pt-1 pb-1 pl-4 pr-4 rounded-xl ml-3 text-sm"
              >
                Kaydet
              </button>
            </form>
          </div>
        ) : (
          <div className="flex justify-evenly border-2 border-title p-4 rounded-lg shadow-md w-1/3">
            <p>Email:</p>
            <p className="mb-2">{currentUser.email}</p>
            <button
              onClick={handleClickE}
              className="border-2 border-green-500 bg-green-500 hover:scale-110 text-white pt-1 pb-1 pl-4 pr-4 rounded-xl ml-3 text-sm"
            >
              Güncelle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
