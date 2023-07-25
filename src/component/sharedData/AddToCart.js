import axios from "axios";
import React, { useContext } from 'react'
import { createContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";


export let AddToCartContext = createContext(null);



export default function AddToCart(props) {
    let{getAllCartData} =  useContext(CartContext)
    
    let baseUrl = `https://route-ecommerce.onrender.com`;
 

     async function addToCart(id){
        let body  = {
            productId : id ,
        };
        let headers = {
            token : localStorage.getItem("token"),
        }
    
        let {data} = await axios.post(`${baseUrl}/api/v1/cart`, body , {headers : headers}).catch((error)=>{
            window.alert(error);
        })
        console.log(data);
            if(data.status == "success"){
                getAllCartData()
                return true;
            }
      }



  return (
   <AddToCartContext.Provider value={{addToCart}}>
    {props.children}
   </AddToCartContext.Provider>
  )
}
