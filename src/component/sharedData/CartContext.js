import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(null);

export function CartProvider(props){ 

  let [cartData , setCartData] = useState(null);
  let baseUrl = `https://route-ecommerce.onrender.com`;
  let headers = {token: localStorage.getItem("token")};
  useEffect(()=>{
    getAllCartData()
  },[])
  async function getAllCartData(){
    let {data} = await axios.get(`${baseUrl}/api/v1/cart` , {headers:headers}).catch((error)=>{console.log(error)});
    // console.log(data);
    if(data.status === "success"){
      setCartData(data);
    }
  }
  async function removeItem(id){
    let {data} = await axios.delete(`${baseUrl}/api/v1/cart/${id}` , {headers})
    setCartData(data);
  }                     
  async function updatCartItemNum(id , count){
    if(count >= 0 ){
      let body = {
        count : count
      };
      console.log(body)
      let {data} = await axios.put(`${baseUrl}/api/v1/cart/${id}` , body , {headers} )
      console.log(data);
      setCartData(data)
    }
  }
  return(
  <CartContext.Provider value={{getAllCartData , cartData , removeItem , updatCartItemNum}}>
    {props.children}
  </CartContext.Provider>
  )
}

