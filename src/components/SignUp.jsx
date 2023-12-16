import React from "react";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";

function SignUp() {
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    actions.resetForm();
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      ad: "",
      soyad: "",
      email: "",
      sifre: "",
      sifreTekrar: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  return (
    <div className="w-screen h-screen bg-signUpback">
      <form
        className="w-screen h-screen flex flex-col justify-center items-center text-slate-100"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label>Ad</label>
          <input
            type="text"
            value={values.ad}
            onChange={handleChange}
            id="ad"
            placeholder="Adınızı Giriniz"
            className="text-black rounded-lg p-1 w-80 mt-2 mb-2 items-center"
          />
          {errors.ad && (
            <p className="error text-red-600 text-xs">{errors.ad}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label>Soyad</label>
          <input
            type="text"
            value={values.soyad}
            onChange={handleChange}
            id="soyad"
            placeholder="Soyadınızı Giriniz"
            className="text-black rounded-lg p-1 w-80 mt-2 mb-2"
          />
          {errors.soyad && (
            <p className="error text-red-600 text-xs">{errors.soyad}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label>Mail Adresiniz</label>
          <input
            type="email"
            value={values.email}
            onChange={(e) =>
              setFieldValue("email", e.currentTarget.value)
            } /*to be able to fix unwritable input i used setFieldValue function*/
            id="mailAdress"
            placeholder="Mail Adresinizi Giriniz"
            className="text-black rounded-lg p-1 w-80 mt-2 mb-2"
          />
          {errors.email && (
            <p className="error text-red-600 text-xs">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label>Şifre</label>
          <input
            type="password"
            value={values.sifre}
            onChange={handleChange}
            id="sifre"
            placeholder="Şifrenizi Giriniz"
            className="text-black rounded-lg p-1 w-80 mt-2 mb-2"
          />
          {errors.sifre && (
            <p className="error text-red-600 text-xs">{errors.sifre}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label>Şifre Tekrar</label>
          <input
            type="password"
            value={values.sifreTekrar}
            onChange={handleChange}
            id="sifreTekrar"
            placeholder="Şifrenizi Yeniden Giriniz"
            className="text-black rounded-lg p-1 w-80 mt-2 mb-2"
          />
          {errors.sifreTekrar && (
            <p className="error text-red-600 text-xs">{errors.sifreTekrar}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="border-2 border-title bg-title text-black pt-2 pb-2 pl-6 pr-6 rounded-2xl w-80 mt-3 hover:scale-105 hover:delay-250 font-bold tracking-widest "
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}

export default SignUp;
