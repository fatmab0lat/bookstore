import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const basicSchema = yup.object().shape({
  ad: yup.string().min(3, "en az 3 karakter").required("Adınızı girmelisiniz"),
  soyad: yup
    .string()
    .min(3, "en az 3 karakter")
    .required("Soyadınızı girmelisiniz"),
  email: yup
    .string()
    .email("Geçersiz email")
    .required("Mail adresinizi girmelisiniz"),
  sifre: yup
    .string()
    .min(5, "5 karakterden fazla olmalı")
    .matches(passwordRules, {
      message: "en az bir büyük harf, bir küçük harf ve bir sayı",
    })
    .required("Şifre belirlemelisiniz"),
  sifreTekrar: yup
    .string()
    .test("passwords-match", "Şifreler uyuşmalı", function (value) {
      return this.parent.sifre === value;
    })
    // .oneOf([yup.ref("password")], "Şifreler uyuşmuyor")
    .required("Belirlediğiniz şifreyi tekrar girmelisiniz"),
});

export const adminSchema = yup.object().shape({
  username: yup.string().required("Kullanıcı adı zorunludur"),
  password: yup.string().required("Şifre girmek zorunludur"),
});
