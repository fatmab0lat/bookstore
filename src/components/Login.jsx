import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Store/authSlice";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir e-posta girin")
    .required("E-posta alanı zorunludur"),
  password: yup.string().required("Şifre alanı zorunludur"),
});

function Login() {
  const [loginError, setLoginError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const handleLogin = async (values) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: values.email,
          password: values.password,
          grant_type: "password",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);
        console.log("Access Token:", data.token);
        // Token doğrulandı, kullanıcı bilgilerini alabiliriz
        const userResponse = await fetch("http://127.0.0.1:8000/users/", {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });

        if (userResponse.ok) {
          const usersData = await userResponse.json();
          const currentUser = usersData.find(
            (user) => user.email === values.email
          );
          dispatch(loginSuccess({ currentUser, token: data.token }));
          console.log(currentUser);
          navigateToHome();
        } else {
          console.error("Error fetching user data:", userResponse.status);
          setLoginError(
            "Kullanıcı bilgileri alınamadı. Lütfen tekrar deneyiniz."
          );
        }
      } else {
        console.error("Login failed:", response.status);
        setLoginError(
          "Kullanıcı adı veya şifresi geçersiz. Lütfen tekrar deneyiniz."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
    }
  };

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
