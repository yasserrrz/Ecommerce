import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Login({saveUserData}) {
  let baseUrl = `https://route-ecommerce.onrender.com`;
  let [errorMsg, setErrorMsg] = useState("");
  let [loading, setLoading] = useState(true);
  let navegate = useNavigate();
  let validation = Yup.object({
    
    email: Yup.string().required("Required")
    // .email("Invalid email address")
    ,
    password: Yup.string()
      .required("Password Is Required")
      .matches(
        /^[A-Z][a-z0-9!@#$^&*%)]{3,15}$/,
        "Paasword Must Strat with Capital Litter and Contain Numbers or #$%^&*@)( "
      ),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      login(values);
    },
    validationSchema: validation,
  });
  async function login(values) {
    setLoading(false);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/signin`, values)
      .catch(({ response }) => {
        console.log(response.data.message);
        setErrorMsg(response.data.message);
        setLoading(true);
      });
    console.log(data);
    setErrorMsg("");
    setLoading(true);
    if (data.message === "success") {
      //data
      //token
      // navegate to another page (home)
      saveUserData(data.user)
      localStorage.setItem("token" , data.token)
      navegate('/home')
    }else{
      // navegate("/")
    }
  }
  return (
    
    <div className="p-4 col-md-8 m-auto">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        
        <div className="my-3">
          <label htmlFor="email">Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="email"
            id="email"
            className="form-control bg-transparent text-white my-2"
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="text-danger">* {formik.errors.email}</p>
          ) : null}
        </div>
        <div className="my-3">
          <label htmlFor="password">Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="form-control bg-transparent my-2"
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="text-danger">*{formik.errors.password}</p>
          ) : null}
        </div>
        {errorMsg ? (
          <div className="alert alert-danger ">
            <p>{errorMsg}</p>
          </div>
        ) : (
          ""
        )}
        {!loading ? (
          <button type="button" className="btn btn-info py-2 px-4">
            <i className="fa fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!formik.isValid}
            onClick={formik.handleSubmit}
            className="btn btn-outline-info py-2"
            >
            Register
          </button>
        )}
        <Link className="d-block" to={"/forgetPass"}>Forget Password ?</Link>
      </form>
    </div>
    
  );
}
