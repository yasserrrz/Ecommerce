import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register({ saveUserData }) {
  let baseUrl = `https://route-ecommerce.onrender.com`;
  let [errorMsg, setErrorMsg] = useState("");
  let [loading, setLoading] = useState(true);
  let navegate = useNavigate();
  let validation = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
      .max(16, "Must be 16 characters or less")
      .required("Required")
      .min(4, "Must be 4 characters or more"),
    email: Yup.string().required("Required").email("Invalid email address"),
    phone: Yup.string()
      .required("Required")
      .matches(
        /^(010|012|015|011)[0-9]{8}$/,
        "Enter Valid Egyption Phone Number "
      ),
    password: Yup.string()
      .required("Password Is Required")
      .matches(
        /^[A-Z][a-z0-9!@#$^&*%)]{3,15}$/,
        "Paasword Must Strat with Capital Litter and Contain Numbers or #$%^&*@)( "
      ),
    rePassword: Yup.string()
      .required("Repassword Is Required")
      .oneOf([Yup.ref("password")], "Repassword Not Match"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => {
      console.log(values);
      signUp(values);
    },
    validationSchema: validation,
  });
  async function signUp(values) {
    setLoading(false);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/signup`, values)
      .catch(({ response }) => {
        console.log(response.data.errors.msg);
        setErrorMsg(response.data.errors.msg);
        setLoading(true);
      });
    console.log(data);
    setErrorMsg("");
    setLoading(true);
    if (data.message === "success") {
      //data
      //token
      // navegate to another page (home)
      saveUserData(data.user);
      localStorage.setItem("token", data.token);
      navegate("/login");
    }
  }
  return (
    <div className="p-4 col-md-8 m-auto">
      <h1>Regesteration Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="my-3">
          <label htmlFor="name">Name</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            id="name"
            className="form-control bg-transparent  my-2"
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-danger">* {formik.errors.name}</p>
          ) : (
            ""
          )}
        </div>
        <div className="my-3">
          <label htmlFor="email">Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="email"
            id="email"
            className="form-control bg-transparent  my-2"
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
            className="form-control bg-transparent  my-2"
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="text-danger">*{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="my-3">
          <label htmlFor="rePassword">Repassword</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
            className="form-control bg-transparent  my-2"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="text-danger">*{formik.errors.rePassword}</p>
          ) : null}
        </div>
        <div className="my-3">
          <label htmlFor="phone">Phone</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="phone"
            id="phone"
            className="form-control bg-transparent  my-2"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="text-danger">*{formik.errors.phone}</p>
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
      </form>
    </div>
  );
}
