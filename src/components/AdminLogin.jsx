import React, { useState } from "react";
import { useFormik } from "formik";
import { adminSchema } from "../schemas";

function Admin() {
  const [usernameData, setUsernameData] = useState("");
  const [passwordData, setPasswordData] = useState("");

  const { values, errors, handleSubmit, setFieldValue, isValid, dirty } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: adminSchema,
    });
  const handleUsernameChange = (event) => {
    setFieldValue("username", event.currentTarget.value);
    setUsernameData(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setFieldValue("password", event.currentTarget.value);
    setPasswordData(event.target.value);
  };

  return (
    <div className="w-screen h-screen bg-signUpback">
      <form className="w-screen h-screen flex flex-col justify-center items-center text-slate-100">
        <div className="flex flex-col">
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            onChange={handleUsernameChange}
            name="username"
            value={values.username}
            className="text-black rounded-lg p-1 w-80 mt-2 mb-2 items-center"
          />
          {errors.username && (
            <p className="error text-red-600 text-xs">{errors.username}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label>Şifre</label>
          <input
            type="password"
            onChange={handlePasswordChange}
            name="password"
            value={values.password}
            className="text-black rounded-lg p-1 w-80 mt-2 mb-2 items-center"
          />
          {errors.password && (
            <p className="error text-red-600 text-xs">{errors.password}</p>
          )}
        </div>
        <button
          disabled={!(isValid && dirty)}
          className="border-2 border-title bg-title text-black pt-2 pb-2 pl-6 pr-6 rounded-2xl w-80 disabled:opacity-40 disabled:scale-100 mt-3 hover:scale-105 hover:delay-250 font-bold tracking-widest "
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default Admin;
