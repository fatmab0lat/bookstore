import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("/signUp");
  };
  return (
    <div className="h-screen w-screen">
      {/* NAVBAR START */}
      <div className="flex justify-around pt-8 font-semibold">
        <div className="text-3xl text-title border-b-4 border-title rounded-xl pb-2 ml-7">
          <h1>Kitap Kurdu</h1>
        </div>
        {/* SEARCH BAR */}
        <div className="w-2/5 text-center">
          <form>
            <label className="text-navbar font-medium">Ara:</label>
            <input
              type="text"
              name="searchBar"
              className="border-2 border-black pt-1 pb-1 pl-6 pr-6 rounded-2xl w-3/5 ml-3"
            />
            <button className="border-2 border-black pt-2 pb-2 pl-3 pr-3 rounded-2xl ml-3 hover:bg-slate-300 delay-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </form>
        </div>
        {/* SIGN IN/ SIGN UP */}
        <div>
          <button
            onClick={navigateToSignUp}
            className="border-2 border-navbar bg-navbar hover:bg-red-600 hover:border-red-600 hover:scale-110 text-gray-300 pt-1 pb-1 pl-5 pr-5 rounded-xl ml-3 text-sm"
          >
            Üye Ol
          </button>
          <button className="border-2 border-navbar bg-navbar hover:bg-red-600 hover:border-red-600 hover:scale-110  text-gray-300 pt-1 pb-1 pl-5 pr-5 rounded-xl ml-3 text-sm">
            Giriş Yap
          </button>
        </div>
      </div>
      {/* NAVBAR END */}

      {/* CATEGORIES START */}
      <div className="text-center align-middle mt-5 p-6 bg-lime-600 text-gray-100">
        <div className="flex justify-evenly w-full font-bold text-lg text-center ">
          <div>
            <a>Bilim Kurgu</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a>Fantastik</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a>Macera</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a>Romantik</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a>Polisiye</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a>Klasikler</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a>Şiir</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a>Çizgi Roman</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a>İletişim</a>
          </div>
        </div>
      </div>
      {/* CATEGORIES END */}
    </div>
  );
}

export default Home;
