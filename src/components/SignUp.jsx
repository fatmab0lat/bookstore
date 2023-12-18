import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import api from "../api";

function SignUp() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const fetchUsers = async () => {
    const response = await api.get("/users/");
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    actions.resetForm();
  };

  const { values, errors, handleSubmit, setFieldValue, isValid } = useFormik({
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
            onChange={(e) => setFieldValue("ad", e.currentTarget.value)}
            name="firstName"
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
            onChange={(e) => setFieldValue("soyad", e.currentTarget.value)}
            name="lastName"
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
            } /*to be able to fix unwritable input i used setFieldValue function  */
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
            onChange={(e) => setFieldValue("sifre", e.currentTarget.value)}
            name="password"
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
            onChange={(e) =>
              setFieldValue("sifreTekrar", e.currentTarget.value)
            }
            name="confirmPassword"
            placeholder="Şifrenizi Yeniden Giriniz"
            className="text-black rounded-lg p-1 w-80 mt-2 mb-2"
          />
          {errors.sifreTekrar && (
            <p className="error text-red-600 text-xs">{errors.sifreTekrar}</p>
          )}
        </div>
        <button
          // disabled={isSubmitting}
          disabled={!isValid}
          type="submit"
          className="border-2 border-title bg-title text-black pt-2 pb-2 pl-6 pr-6 rounded-2xl w-80 disabled:opacity-40 disabled:scale-100 mt-3 hover:scale-105 hover:delay-250 font-bold tracking-widest "
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}

export default SignUp;
