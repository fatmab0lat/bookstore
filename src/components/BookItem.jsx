import React from "react";

function BookItem({ key, title, author, price, coverImg }) {
  return (
    <div className="text-center p-5 pl-7 pr-7 m-3 rounded-lg">
      <img src={coverImg} className="w-36 h-48 mx-auto" />
      <p>{author}</p>
      <p className="">{title}</p>
      <p>{price} tl</p>
      <button className="border-2 border-title bg-title hover:scale-110 text-black pt-1 pb-1 pl-4 pr-4 rounded-xl font-semibold text-sm">
        İncele
      </button>
    </div>
  );
}

// w-32 h-48

export default BookItem;
