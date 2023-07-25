import React, { useContext, useEffect } from 'react'
import { CartContext } from '../sharedData/CartContext';
import { Link } from 'react-router-dom';

export default function OffocanvasCart() {
    let {getAllCartData , cartData , removeItem , updatCartItemNum} = useContext(CartContext);
    // useEffect(()=>{
    //   getAllCartData()
    // }, [])
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
  return (
    <>
<div class="offcanvas offcanvas-end rounded-5" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasRightLabel">Your Cart</h5>
    <button type="button" class="btn-close text-reset " data-bs-dismiss="offcanvas" aria-label="Close">
    <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
  <div class="offcanvas-body">
      {
        
        cartData?.data?.products.map((element)=>{
          return<>
            <div key={element.product._id} className='border-dash mb-3'>
            <div className='d-flex justify-content-between  my-1 align-items-center '>
            <img src={element.product.imageCover} className='w-25' height={70} alt="" />
            <div>
              <button className='btn btn-danger btn-sm px-2' onClick={()=>{ decrCount(element.product._id , element.count) }} >-</button>
              <span className='m-2 '>{element.count}</span>
              <button className='btn btn-info  btn-sm px-2 ' onClick={()=>{ increConunt(element.product._id , element.count) }} >+</button>
            </div>
            <div>
              <i class="fa-solid fa-trash text-danger" onClick={()=>{removeItem(element.product._id)}}></i>
            </div>
          </div>
          <h5>{element.product.title.split(" ").splice(0 , 4).join(" ")}</h5>
          </div>
          </>
        })
      
      }
      
     
  </div>
<div className='offcanvas-bottom p-3'>
<div className='cart-price bg-danger d-flex justify-content-around'>
        <h6>Total</h6>
        <h6>
      {cartData?.data?.totalCartPrice} EGP
        </h6>
      </div>
      <div className='text-center'>
        <Link className='btn btn-info border' to={cartData?.data?.totalCartPrice > 0 ? "/checkOut/"+cartData?.data?._id : "/home"}>Check Out Payment</Link>
      </div>
</div>
</div>
    </>
  )
}
