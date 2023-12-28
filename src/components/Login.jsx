import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir e-posta girin")
    .required("E-posta alanı zorunludur"),
  password: yup.string().required("Şifre alanı zorunludur"),
});

function Login() {
  const handleLogin = (values) => {
    console.log(values);
  };

  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/signUp");
  };

  return (
    <div className="h-screen w-screen bg-loginBack">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <form
            className="w-screen h-screen flex flex-col items-center justify-center text-slate-100"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2">
                E-mail
              </label>
              <input
                type="text"
                name="email"
                className="text-black rounded-lg p-1 w-80 mt-2 mb-2 items-center"
                placeholder="Mail Adresinizi Giriniz"
                value={values.email}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <div className="error text-red-600 text-xs">{errors.email}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2">
                Şifre
              </label>
              <input
                type="password"
                name="password"
                className="text-black rounded-lg p-1 w-80 mt-2 mb-2 items-center"
                placeholder="Şifrenizi Giriniz"
                value={values.password}
                onChange={handleChange}
              />
              {touched.password && errors.password && (
                <div className="error text-red-600 text-xs">
                  {errors.password}
                </div>
              )}
            </div>
            <button
              className="border-2 border-title bg-title text-black pt-2 pb-2 pl-6 pr-6 rounded-2xl w-80 disabled:opacity-40 disabled:scale-100 mt-3 hover:scale-105 hover:delay-250 font-bold tracking-widest"
              type="submit"
            >
              Giriş Yap
            </button>
            <div className="flex mt-3">
              <p>Hesabınız yok mu?</p>
              <button className="text-blue-300 ml-2" onClick={navigateToSignUp}>
                Üye Ol
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
export default Login;
