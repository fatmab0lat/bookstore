import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../Store/cartSlice"
import { useNavigate } from "react-router-dom";

function BookDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [error, setError] = useState(null);
  const navigateToBasket = () => {
    navigate("/basket");
  };
  useEffect(() => {
    const getBookDetails = async () => {
      const path = `/books/by-id/${bookId}`;
      console.log("Requesting path:", path);
      try {
        const response = await api.get(path);
        setBookDetails(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        if (error.response) {
          if (error.response.status === 422) {
            setError("Book not found. Please check the book ID.");
          } else {
            setError("An error occurred while fetching book details.");
          }
        } else {
          setError("Network error. Please try again later.");
        }
      }
    };
    
    getBookDetails();
  }, [bookId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-loginBack">
      <div className="flex flex-col md:flex-row border-2 rounded-lg border-title w-150 h-150">
        <div className="flex-1 items-center  flex justify-center items-center">
          <img src={bookDetails.coverImg} className="w-72 h-96 mx-auto" alt="Book Cover" />
        </div>
        <div className="flex-1 text-white flex flex-col justify-center items-center">
          <div>
            <h1 className="text-red-600">Kitap Adı: </h1>
            <h1> {bookDetails.title}</h1>
            <h1 className="text-red-600">Kategori: </h1>
            <h1>{bookDetails.genres}</h1>
            <h1 className="text-red-600">Sayfa Sayısı: </h1>
            <h1>{bookDetails.price}</h1>
            <h1 className="text-red-600">Yazar: </h1>
            <h1>{bookDetails.author}</h1>
            <h1 className="text-red-600">Özet: </h1>
            <h1>{bookDetails.description}</h1>
            
          </div>
          <div className="flex justify-end items-end mt-auto mb-4">
            <button
              className="border-2 border-title bg-title text-center text-black pt-2 pb-2 pl-6 pr-6 rounded-2xl w-50 h-10 mt-3 hover:scale-90 hover:delay-90 font-bold"
              type="submit"
              onClick={() =>{ dispatch(addToCart(bookDetails));
                navigateToBasket();
              }}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
