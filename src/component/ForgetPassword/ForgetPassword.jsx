import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function ForgetPassword() {
  let baseUrl = `https://route-ecommerce.onrender.com`;
  let navegate = useNavigate();
    let [loading, setLoading] = useState(true);
    let [message , setMessage] = useState("");
    let [message2 , setMessage2] = useState("");
    let validScema = Yup.object({
        email: Yup.string().required("Email Is Required").email("Enter Valid Email"),
    });
    let formik1 = useFormik({
        initialValues:{
            email:""
        },
        onSubmit:(value)=>{
            console.log(value);
            gettheReset(value);
        },
        validationSchema : validScema,
    });

    async function gettheReset(email){
        setLoading(false);
        let {data} = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, email).catch(({response})=>{
            setMessage2(response.data.message)
            setMessage("")
            setLoading(true);

        });
       setMessage(data.message);
       setMessage2("")
       setLoading(true);
       navegate("/resetCode")
    }
  return (
    <div className=' '>
        <form  onSubmit={formik1.handleSubmit} className='py-3 col-md-8 m-auto'>
            <div className='mb-3'>
                <label className='h3 mb-3 ' htmlFor="email">Enter Your Email</label>
            
                <input onChange={formik1.handleChange} onBlur={formik1.handleBlur} type="email" name="email" id="email"  className='form-control mb-2 bg-transparent text-white'/>
                {formik1.touched.email && formik1.errors.email ? (
            <p className="text-danger fw-bolder">* {formik1.errors.email}</p>
          ) : (
            ""
          )}
            </div>
        
            {!loading ? (
          <button type="button" className="btn btn-info py-2 px-4">
            <i className="fa fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!formik1.isValid}
            onClick={formik1.handleSubmit}
            className="btn btn-info py-2"
          >
            Get The Code
          </button>
        )}
        </form>
        {message? <div className='col-md-8 m-auto alert alert-primary text-center p-4'>
        {message}
    </div> : ""}
    {message2? <div className='col-md-8 m-auto alert alert-danger text-center p-4'>
        {message2}
    </div> : ""}
    </div>
    
  )
}
