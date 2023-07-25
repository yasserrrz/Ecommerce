import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function VerifyResetCode() {
  let baseUrl = `https://route-ecommerce.onrender.com`;
  let [loading, setLoading] = useState(true);
  let navegate = useNavigate();
  let [errMessage , setErrMessage] = useState("");
    let validation = Yup.object({
        resetCode : Yup.string().required()
    })
    let formik = useFormik({
        initialValues:{
            resetCode:""
        },
        onSubmit:(val)=>{
            console.log(val);
            setCode(val);
        }
        ,
        validationSchema: validation

    })

    async function setCode(code){
        setLoading(false);
        let {data} = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, code ).catch(({response})=>{
            setErrMessage(response.data.message);
       setLoading(true)
             
        })
       if(data.status === "Success"){
            navegate("/resetPass")
       }
       setLoading(true)
    }
  return (
    <div>
        <form className='py-3 col-md-8 m-auto' onSubmit={formik.handleSubmit}>

            <div>
                <label htmlFor="resetCode" className='h3 '> Reset Code</label>
                <input type="text" onChange={formik.handleChange} name='resetCode' id='resetCode'  className='form-control bg-transparent ' />
                {formik.touched.resetCode && formik.errors.resetCode ? (
            <p className="text-danger fw-bolder">* {formik.errors.resetCode}</p> ):""}
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
        {errMessage? <div className='col-md-8 m-auto alert alert-danger text-center p-4'>
        {errMessage}
    </div> : ""}
        </form>
    </div>
  )
}
