import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../component/sharedData/CartContext'
import { Link } from "react-router-dom";
import { data } from 'jquery';

export default function CartDetails() {
  let {getAllCartData , cartData , removeItem , updatCartItemNum} = useContext(CartContext);
  useEffect(()=>{
    getAllCartData()
  }, [])
  
  function increConunt(id , count){
    count++
    updatCartItemNum( id , count);
  }
  function decrCount(id , count){
    if(count-- >=0){
      count--
      updatCartItemNum(id , count);
    }
  }
  return (<>
    <h2 className='my-3'>Cart Details</h2>
  {cartData ? 
  <> 
  <table className='  table table-striped align-middle text-center mt-4 rounded-circle'>
  <thead className='text-center'>
    <tr>
      <th>
        Image
      </th>
      <th>
        Name
      </th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody className=''>
   {cartData?.data?.products.map((element )=>{
    return<>
     <tr key={element.product._id}>
      <td>
        <img src={element.product.imageCover} height={100} className='w-50' alt="" />
      </td>
      <td>{element.product.title.split(" ").splice(0 , 4).join(" ")}</td>
      <td>
        <button className='btn btn-danger btn-sm px-2'  onClick={()=>{ decrCount(element.product._id , element.count) }}>-</button>
        <span className='m-2 '>{element.count}</span>
        <button className='btn btn-info  btn-sm px-2 ' onClick={()=>{increConunt(element.product._id , element.count )}}>+</button>
      </td>
      <td>{element.price} EGP</td>
      <td><i class="fa-solid fa-trash text-danger" onClick={()=>{removeItem(element.product._id )}}></i></td>
    </tr>
    </>
   })}
    <tr className='table-danger'>
      <td colSpan={3}>
        Total
      </td>
      <td colSpan={2}>
        {cartData.data.totalCartPrice}EGP
      </td>
    </tr>
  </tbody>
</table>
 <Link className='btn btn-info border' to={cartData.data.totalCartPrice > 0 ? "/checkOut/"+cartData.data._id : "/home"}>Check Out Payment</Link>
 {cartData.data.totalCartPrice <= 0? <p className='text-danger'>* Your Cart Is Empity </p>: ""}
  </>
  : ""}
    </>
  )
}
