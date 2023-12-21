import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { basicSchema } from "../schemas";
import api from "../api";

function SignUp() {
  const [users, setUsers] = useState([]);
  const [firstNameData, setFirstNameData] = useState("");
  const [lastNameData, setLastNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [confirmedPasswordData, setConfirmedPasswordData] = useState("");
  const [hashed_password, setHashedPassword] = useState("");

  const fetchUsers = async () => {
    const response = await api.get("/users/");
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFirstNameChange = (event) => {
    setFieldValue("ad", event.currentTarget.value);
    setFirstNameData(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setFieldValue("soyad", event.currentTarget.value);
    setLastNameData(event.target.value);
  };
  const handleEmailChange = (event) => {
    setFieldValue("email", event.currentTarget.value);
    setEmailData(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setFieldValue("sifre", event.currentTarget.value);
    setPasswordData(event.target.value);
  };
  const handleConfirmedPasswordChange = (event) => {
    setFieldValue("sifreTekrar", event.currentTarget.value);
    setConfirmedPasswordData(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post("/users/", {
      firstName: firstNameData,
      lastName: lastNameData,
      email: emailData,
      hashed_password: passwordData,
    });
    fetchUsers();
    setFirstNameData("");
    setLastNameData("");
    setEmailData("");
    setPasswordData("");
    setConfirmedPasswordData("");
  };

  /*const sendPassword = async () => {
    try {
      const response = await api.post("/hash_password/", {
        hashed_password: passwordData,
      });
      const hashedPassword = response.data.hashed_password;
      setHashedPassword(hashedPassword); // Hashlenmiş şifreyi state'e set et
    } catch (error) {
      console.error("Şifre hashleme işlemi başarısız oldu:", error);
    }
  };*/

  /*const onSubmit = async (values, actions) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    actions.resetForm();
  };*/

  const { values, errors, handleSubmit, setFieldValue, isValid } = useFormik({
    initialValues: {
      ad: "",
      soyad: "",
      email: "",
      sifre: "",
      sifreTekrar: "",
    },
    validationSchema: basicSchema,
  });
  return (
    <div className="w-screen h-screen bg-signUpback">
      <form
        className="w-screen h-screen flex flex-col justify-center items-center text-slate-100"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col">
          <label>Ad</label>
          <input
            type="text"
            value={firstNameData}
            onChange={handleFirstNameChange}
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
            value={lastNameData}
            onChange={handleLastNameChange}
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
            value={emailData}
            onChange={
              handleEmailChange
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
            value={passwordData}
            onChange={handlePasswordChange}
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
            value={confirmedPasswordData}
            onChange={handleConfirmedPasswordChange}
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

/*
            onChange={(e) =>
              setFieldValue("email", e.currentTarget.value)

*/
export default SignUp;
