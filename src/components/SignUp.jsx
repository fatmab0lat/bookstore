import React from "react";
import { useFormik } from "formik";

function SignUp() {
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      ad: "",
      soyad: "",
      sifre: "",
      sifreTekrar: "",
    },
  });
  return (
    <div className="w-screen h-screen bg-signUpback">
      <form className="w-screen h-screen flex flex-col justify-center items-center text-slate-100">
        <div className="flex flex-col">
          <label>Ad</label>
          <input
            type="text"
            value={values.ad}
            onChange={handleChange}
            id="ad"
            placeholder="Adınızı Giriniz"
          />
        </div>
        <div className="flex flex-col">
          <label>Soyad</label>
          <input
            type="text"
            value={values.soyad}
            onChange={handleChange}
            id="soyad"
            placeholder="Soyadınızı Giriniz"
          />
        </div>
        <div className="flex flex-col">
          <label>Mail Adresiniz</label>
          <input
            type="email"
            value={values.email}
            onChange={handleChange}
            id="mailAdress"
            placeholder="Mail Adresinizi Giriniz"
          />
        </div>
        <div className="flex flex-col">
          <label>Şifre</label>
          <input
            type="password"
            value={values.sifre}
            onChange={handleChange}
            id="sifre"
            placeholder="Şifrenizi Giriniz"
          />
        </div>
        <div className="flex flex-col">
          <label>Şifre Tekrar</label>
          <input
            type="password"
            value={values.sifreTekrar}
            onChange={handleChange}
            id="sifreTekrar"
            placeholder="Şifrenizi Yeniden Giriniz"
          />
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
}

export default SignUp;
