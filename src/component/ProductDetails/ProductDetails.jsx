import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import $ from 'jquery'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { AddToCartContext } from '../sharedData/AddToCart';

export default function ProductDetails() {
    let baseUrl = `https://route-ecommerce.onrender.com`;
   let {addToCart} =useContext(AddToCartContext)
    let [details , setdetails] = useState({}) ;
    let {id} = useParams();
    console.log(id)
    useEffect(()=>{
        getDetails()
        
    }, []);
    
    async function getDetails(){
        let {data} = await axios.get(`${baseUrl}/api/v1/products/${id}`).catch((error)=>{
            console.log(error)
        })
        // console.log(data.data);
        setdetails(data.data) 
        $(".loading").fadeOut(3000)
       }
//    async function addToCart(id){
//         let body  = {
//             productId : id ,
//         };
//         let headers = {
//             token : localStorage.getItem("token"),
//         }

//         let {data} = await axios.post(`${baseUrl}/api/v1/cart`, body , {headers : headers}).catch((error)=>{
//             window.alert(error);
//         })
//         console.log(data);
//             if(data.status == "success"){
//                 navegate("/cartDetails")
//             }
//       }
  return ( <>
      <div style={{display:"flex" , position : "fixed" , zIndex:"999999"}}  className=' loading  top-0 bottom-0 start-0 end-0 bg-black  justify-content-center align-items-center'>
      <span className="loader"></span>
      </div>
  <div className='row py-5 align-items-center'>
        <div className="col-md-4">
            <OwlCarousel className='owl-theme' loop items={1}  nav>
                {details.images?.map((ele , i )=>{
                    console.log(i)
                    return<>
                    <img src={ele} key={i} className='w-100' alt="" />
                    </>
                })}
            </OwlCarousel>
        </div>
        <div className="col-md-8  ">
            <h2>{details.title}</h2>
            <p className='text-muted'> {details.description}</p>
            <span className='text-info my-3  fw-bolde'> {details.category?.name} </span>
            <div className='modal-footer  justify-content-between '>
                <p className='price'> {details.price} EGP</p>
                <p className='Rate'><i className='fa-solid fa-star text-warning'></i> {details.ratingsAverage}</p>
              </div>
              <button onClick={()=>{addToCart(details._id)}} className='btn btn-info w-100 my-1'>+Add</button> 
        </div>
    </div>
    </>
  )
}
