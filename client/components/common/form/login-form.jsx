import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";
import ErrorMsg from "./error-msg";
import { loginSchema } from "./validation-schema";
import Cookies from "js-cookie";
import axios from "axios";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        values
      );

      console.log(response.data.token);
      Cookies.set('token', response.data.token)
      window.location.href = "/"
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: loginSchema,
      onSubmit: handleOnSubmit,
    });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Email Address <span>**</span>
        </label>
        <input
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          placeholder="Email address..."
        />
        {touched.email && <ErrorMsg error={errors.email} />}
        <label htmlFor="pass">
          Password <span>**</span>
        </label>
        <div style={{ position: "relative" }}>
          <input
            id="pass"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password..."
          />
          <i
            onClick={handleTogglePassword}
            // className={`fa ${
            //   showPassword ? "fa-eye-slash" : "fa-eye"
            // } password-icon`}
            // style={{
            //   position: "absolute",
            //   right: "10px",
            //   top: "50%",
            //   transform: "translateY(-50%)",
            //   cursor: "pointer",
            // }}
          ></i>
        </div>
        {touched.password && <ErrorMsg error={errors.password} />}
        <div className="login-action mb-20 fix">
          <span className="log-rem f-left">
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">Remember me!</label>
          </span>
          <span className="forgot-login f-right">
            <a href="#">Lost your password?</a>
          </span>
        </div>
        <button className="os-btn w-100">Login Now</button>
        <div className="or-divide">
          <span>or</span>
        </div>
        <Link href="/register">
          <a className="os-btn os-btn-black w-100">Register Now</a>
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
