import React from "react";
import { Link } from "react-router-dom";
function BookItem({ key, title, author, price, coverImg,bookId }) {
  const detailPath = `/book/${bookId}`;
  return (
    <div className="text-center p-5 pl-7 pr-7 m-3 rounded-lg">
      <img src={coverImg} className="w-36 h-48 mx-auto" />
      <p>{author}</p>
      <p className="">{title}</p>
      <p>{price} tl</p>
      <Link to={detailPath}>
      <button className="border-2 border-title bg-title hover:scale-110 text-black pt-1 pb-1 pl-4 pr-4 rounded-xl font-semibold text-sm">
        İncele
      </button>
      </Link>
    </div>
  );
}

// w-32 h-48

export default BookItem;
