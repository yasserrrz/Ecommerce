import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'



export let categoryContext = createContext(null);

export default function CategoryProvider(props) {
   let baseUrl = `https://route-ecommerce.onrender.com`;
   let [categorysList, setCategorys] = useState([]);

   async function getCategorys(dataKind) {
      let { data } = await axios.get(`${baseUrl}/api/v1/${dataKind}`).catch((error) => {
         console.log(error)
      })
      console.log(data.data);
      setCategorys(data.data)
   }
   return (
      <categoryContext.Provider value={{ categorysList, getCategorys }}>
         {props.children}
      </categoryContext.Provider>
   )
}
