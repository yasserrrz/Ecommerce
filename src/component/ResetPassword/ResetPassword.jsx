import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function ResetPassword() {
    let baseUrl = `https://route-ecommerce.onrender.com`;
    let navegate = useNavigate();
    let [errMessage , setErrMessage] = useState("");
    let [loading, setLoading] = useState(true);

    let validPass = Yup.object({
        email : Yup.string().email("Invalid email address").required('Email is required'),
        newPassword : Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9!@#$^&*%)]{3,15}$/,"Paasword Must Strat with Capital Litter and Contain Numbers or #$%^&*@)("),
        
    })
    let formik = useFormik({
        initialValues:{
            email:"",
            newPassword:"",
          
        },
        onSubmit:(values)=>{
            console.log(values);
            resetPass(values);
        },
        validationSchema: validPass,
    })
    async function resetPass(value){
        setLoading(false)
        let {data} = await axios.put(`${baseUrl}/api/v1/auth/resetPassword`, value).catch((error)=>{
            console.log(error);
            setErrMessage(error.response.data.message);
            setLoading(true)
        });
        if(data.token){
            navegate("/login");
        }
        setLoading(true)
    }
  return (< >
    <form onSubmit={formik.handleSubmit} className='py-3 col-md-8 m-auto'> 
        <div className='mb-3'>
            <label htmlFor="email" className='h5'> Enter Your Email </label>
            <input onChange={formik.handleChange}  onBlur={formik.handleBlur} type="email" name='email' id='email' className='form-control bg-transparent ' />
            {formik.touched.email && formik.errors.email ? <p className='text-danger'>*{formik.errors.email}</p>: ""}
        </div>
        <div className='mb-3'>
            <label htmlFor="newPassword" className='h5'> Enter Your New Password </label>
            <input onChange={formik.handleChange}  onBlur={formik.handleBlur} type="password" name='newPassword' id='newPassword' className='form-control bg-transparent ' />
            {formik.touched.newPassword && formik.errors.newPassword ? <p className='text-danger'>*{formik.errors.newPassword}</p>: ""}
        </div>
       
        {!loading ? (
          <button type="button" className="btn btn-info py-2 my-2 px-4">
            <i className="fa fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!formik.isValid}
            onClick={formik.handleSubmit}
            className="btn btn-outline-info py-2 my-2"
          >
            Verify
          </button>
        )}  
        
    </form>
    {errMessage? <div className='col-md-8 m-auto alert alert-danger text-center p-4'>
        {errMessage}
    </div> : ""}
  </>
  )
}
