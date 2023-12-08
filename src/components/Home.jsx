import React from "react";

function Home() {
  return (
    <div>
      {/* NAVBAR START */}
      <div className="flex justify-around pt-8 font-semibold">
        <div className="text-3xl text-title border-b-4 border-title rounded-xl pb-2 ml-7">
          <h1>Kitap Kurdu</h1>
        </div>
        <div className="flex justify-evenly w-3/5 font-bold text-lg text-navbar ">
          <div>Bilim Kurgu</div>
          <div className="h-6 w-px bg-black"></div>
          <div>Fantastik</div>
          <div className="h-6 w-px bg-black"></div>
          <div>Macera</div>
          <div className="h-6 w-px bg-black"></div>
          <div>Romantik</div>
          <div className="h-6 w-px bg-black"></div>
          <div>Polisiye</div>
          <div className="h-6 w-px bg-black"></div>
          <div>Klasikler</div>
          <div className="h-6 w-px bg-black"></div>
          <div>Şiir</div>
          <div className="h-6 w-px bg-black"></div>
          <div>Çizgi Roman</div>
          <div className="h-6 w-px bg-black"></div>
          <div>İletişim</div>
        </div>
      </div>
      {/* NAVBAR END */}

      {/* CONTEXT START */}
      <div className="text-center align-middle">
        <p>ALIŞVERİŞİN GÜVENLİ ADRESİ</p>
        <p>Aradığınız her kategoride kitap bulma imkanı</p>
      </div>
      {/* CONTEXT END */}
    </div>
  );
}

export default Home;
