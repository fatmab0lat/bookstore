import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../Store/authSlice";
import FilteredBooks from "./FilteredBooks";
import GenreTemplate from "./GenreTemplate";
import api from "../api";
import BookItem from "./BookItem";
import Contact from "./Contact";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser } = useSelector(selectAuth);
  const [checkButton, setCheckButton] = useState(false);
  const [search, setSearch] = useState("");
  const [wanted, setWanted] = useState([]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleSearch = async () => {
    setCheckButton(true);
    const path = "/boooks/" + search;
    console.log(path);
    await api
      .get(path)
      .then((response) => {
        setWanted(response.data);
        console.log("aranan kitap :", wanted);
      })
      .catch((error) => {
        console.error("error : ", error);
      });
  };

  const navigateToSignUp = () => {
    navigate("/signUp");
  };
  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToProfile = () => {
    navigate("/profile");
  };
  return (
    <div className="h-screen w-screen overflow-x-hidden">
      {/* NAVBAR START */}
      <div className="flex justify-around pt-8 font-semibold" id="top">
        <div className="text-3xl text-title border-b-4 border-title rounded-xl pb-2 ml-7">
          <a href="/">Kitap Kurdu</a>
        </div>
        {/* SEARCH BAR */}
        <div className="w-2/5 text-center">
          <form onSubmit={handleSubmit}>
            <label className="text-navbar font-medium">Ara:</label>
            <input
              type="text"
              name="searchBar"
              placeholder="Arama Yapın"
              className="border-2 border-black pt-1 pb-1 pl-6 pr-6 rounded-2xl w-3/5 ml-3"
              onChange={handleSearchChange}
              value={search}
            />
            <button
              onClick={handleSearch}
              className="border-2 border-black pt-2 pb-2 pl-3 pr-3 rounded-2xl ml-3 hover:bg-slate-300 delay-150"
            >
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
          {isAuthenticated ? (
            <button
              onClick={navigateToProfile}
              className="border-2 border-navbar bg-navbar hover:bg-red-600 hover:border-red-600 hover:scale-110 text-white pt-1 pb-1 pl-5 pr-5 rounded-xl ml-3 text-sm"
            >
              Hoşgeldin {currentUser ? currentUser.firstName : "Misafir"}
            </button>
          ) : (
            <>
              <button
                onClick={navigateToSignUp}
                className="border-2 border-navbar bg-navbar hover:bg-red-600 hover:border-red-600 hover:scale-110 text-white pt-1 pb-1 pl-5 pr-5 rounded-xl ml-3 text-sm"
              >
                Üye Ol
              </button>
              <button
                onClick={navigateToLogin}
                className="border-2 border-navbar bg-navbar hover:bg-red-600 hover:border-red-600 hover:scale-110 text-white pt-1 pb-1 pl-5 pr-5 rounded-xl ml-3 text-sm"
              >
                Giriş Yap
              </button>
            </>
          )}
        </div>
      </div>
      {/* NAVBAR END */}

      {/* CATEGORIES START */}
      <div className="text-center align-middle mt-5 p-6 bg-lime-600 text-gray-100">
        <div className="flex justify-evenly w-full font-bold text-lg text-center ">
          <div>
            <a href="#Science Fiction">Bilim Kurgu</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a href="#Fantasy">Fantastik</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a href="#Adventure">Macera</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a href="#Romance">Romantik</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a href="#Crime">Polisiye</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a href="#Classics">Klasikler</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a href="#Dystopia">Distopya</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a href="#Thriller">Gerilim</a>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <a href="#contact">İletişim</a>
          </div>
        </div>
      </div>
      {/* CATEGORIES END */}
      <div>
        {checkButton && Array.isArray(wanted) && wanted.length ? (
          <div>
            {wanted.map((book, key) => {
              return (
                <BookItem
                  key={key}
                  title={book.title}
                  author={book.author}
                  price={book.price}
                  coverImg={book.coverImg}
                />
              );
            })}
          </div>
        ) : (
          <>
            <FilteredBooks />
          </>
        )}
      </div>
      <Contact />
    </div>
  );
}

export default Home;
