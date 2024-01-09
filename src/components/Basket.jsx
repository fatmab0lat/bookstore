import { useSelector } from 'react-redux';
import { selectCart } from "../Store/cartSlice"
import { selectAuth } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from "../Store/cartSlice";

function Basket() {
  const cart = useSelector(selectCart);
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    
    if (!auth.isAuthenticated) {
      navigate('/login');
    }
  }, [auth.isAuthenticated, navigate]);

  if (!auth.isAuthenticated) {
    return null;  
  }
function calculateTotalPrice(items) {
  return items.reduce((total, item) => total + item.price, 0);
}
/*const handleCompletePurchase = () => {
  alert("Şiparişiniz başarıyla verildi!\nİyi Günler Dileriz :)");
  cart.items.forEach((item) => {
    dispatch(removeFromCart({ id: item.id }));
  });
  navigateToHome();
};*/
const handleCompletePurchase = async () => {
  const token = auth.token;
  const userId = auth.currentUser ? auth.currentUser.id : null;

  const requestOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
          user_id: userId,
          items: cart.items.map(item => ({
              bookid: item.id,
              userid: userId,
              book_title: item.title,
              price: item.price,
          })),
      }),
  };

  try {
      const response = await fetch('http://127.0.0.1:8000/confirm-basket/', requestOptions);
      if (response.ok) {
          alert("Şiparişiniz başarıyla verildi!\nİyi Günler Dileriz :)");
          cart.items.forEach((item) => {
              dispatch(removeFromCart({ id: item.id }));
          });
          navigateToHome();
      } else {
          console.error('Failed to confirm basket:', await response.text());
      }
  } catch (error) {
      console.error('Network error:', error);
  }
};


  return (
    <div className="flex flex-col justify-center items-center h-screen bg-loginBack">
      <h1 className="text-2xl font-bold mb-4 text-title">Sepet</h1>
      <div className=" border-2 rounded-lg border-title w-80 h-80 p-4">
        {cart.items.length === 0 ? (
          <p className='text-red-500 text-4l text-center'>Sepetiniz Boş!</p>
        ) : (
          <div>
            <ul>
              {cart.items.map((item, index) => (
                <li key={index}  className="text-red-500 text-4x ">
                  {item.title} : {item.price}  TL
                </li>
              ))}
            </ul>
            
            <p className='text-red-500 text-4l mt-10 '>Toplam Tutar: {calculateTotalPrice(cart.items)} TL</p>
            <div className="flex flex-col justify-center"> 
             <button onClick={handleCompletePurchase} className="mt-10 border-2 border-title bg-title text-black rounded-2xl px-4 py-2 disabled:opacity-40 hover:scale-105 font-bold">
                Sepeti Onayla!
              </button>
            </div>
          </div>
        )}
        <p onClick={navigateToHome} className=' text-center text-title hover:text-red-600'>Alışverişe Devam Et</p>
      </div>
    </div>
  );
}

export default Basket;
