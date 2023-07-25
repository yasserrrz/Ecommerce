import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { CartContext } from '../sharedData/CartContext';

export default function CheckOut() {
  let baseUrl = `https://route-ecommerce.onrender.com`;
  let {cartData} = useContext(CartContext);
  let {cartId} = useParams();
 
    let validation = Yup.object({
        details: Yup.string("Please Enter Products Details").required("Details Is Required"),
        phone: Yup.number("Please Enter Your Phone Number").required("Phone Number Is Required"),
            city: Yup.string("Please Enter Your City Location").required("City Location Is Required")
    })
    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit:(values)=>{
            // console.log(values);
            checkout(values , cartId);
        }
        ,
        validationSchema:validation
    });
   async function checkout(values , id){
    console.log("test", values);
    let body = {
        shippingAddress : values,
    }
    let headers= {
        token:localStorage.getItem("token")
    }
    let {data} = await axios.post(`${baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:3000/home/#`, body , {headers});
    console.log(data)
    if(data.status === 'success'){
     console.log(data.session.url)
     window.open(data.session.url , "_self") 
    //  or >>> window.location.href = data.session.url

    }else{
      console.log(data)
    }
   }
  return (<>
  <h2 className='my-2'>Check Out Payment</h2>
  <form onSubmit={formik.handleSubmit} className='my-5 ' >
    <div className='my-2 w-75 m-auto'>
        <label htmlFor="details">
        Details
        </label>
            <input type="text" onChange={formik.handleChange} name='details' id='details' className='form-control'  />
            {formik.touched.details && formik.errors.details ? (
            <p className="text-danger">* {formik.errors.details}</p>
          ) : (
            ""
          )}
    </div>
    <div className='my-2 w-75 m-auto'>
        <label htmlFor="phone">
        Phone
        </label>
            <input type="text" onChange={formik.handleChange} name='phone' id='phone' className='form-control'  />
            {formik.touched.phone && formik.errors.phone ? (
            <p className="text-danger">* {formik.errors.phone}</p>
          ) : (
            ""
          )}
    </div>
    <div className='my-2 w-75 m-auto'>
        <label htmlFor="city">
        City
        </label>
            <input type="text" onChange={formik.handleChange} name='city' id='city' className='form-control'/>
            {formik.touched.city && formik.errors.city ? (
            <p className="text-danger">* {formik.errors.city}</p>
          ) : (
            ""
          )}
    </div>
    <div className='my-2 w-75 m-auto'>
    <button className='btn btn-danger' type={ "submit"}>Pay</button>
    </div>
  </form>
  </>
  )
}
