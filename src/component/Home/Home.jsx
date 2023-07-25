import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import $ from 'jquery'
import MainSlider from '../MainSlider/MainSlider';
import Category from '../Category/Category';
import CategorySlider from '../CategorySlider/CategorySlider';
import OffocanvasCart from '../OffocanvasCart/OffocanvasCart';
import { AddToCartContext } from '../sharedData/AddToCart';

export default function Home() {
  let baseUrl = `https://route-ecommerce.onrender.com`;
  let numberOfPages = 1 ;
  let paginatArr = [];
  let [products , setProduct] = useState([]) ;
  let [pagesArr , setPagesArr] = useState([]) ;
  let{addToCart} = useContext(AddToCartContext) 
  useEffect(()=>{
    getProducts(1)
    console.log(products)
  } , []);
  async function getProducts(Num){
    let {data} = await axios.get(`${baseUrl}/api/v1/products?page=${Num}`).catch((error)=>{
      window.alert(error);
    })
    console.log(data , "home");
    numberOfPages= data.metadata.numberOfPages ; 
    paginatArr = [];
    for(let i = 1 ; i<= numberOfPages ; i++){
        paginatArr.push(i);      
    }
    setPagesArr(paginatArr);
    setProduct(data.data);
    $('.loading').fadeOut(3000);
  }
  function getPages(pageNum){
        getProducts(pageNum);
  }

  return (<>
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
   <div style={{display:"flex" , position : "fixed" , zIndex:"999999"}}  className=' loading  top-0 bottom-0 start-0 end-0 bg-black  justify-content-center align-items-center'>
      <span className="loader"></span>
      </div>
    <div className='row '>
        {products.map( (product , index)=>{
         return <div className="col-md-2 col-sm-6 p-3" key={index + 5}>
            <div className='product'>
            <Link className='productLink' to={'/productDetails/'+product._id}>
              <div className='imgParent'>
              <img src={product.imageCover} className='w-100 mb-1' alt="" />
              </div>
              <span className='text-info fw-bolde'> {product.category?.name} </span>
              <h2 className='h5'>{product.title.split(" ").splice(0,2).join(" ")}</h2>
              <div className='modal-footer justify-content-between'>
                <p className='price'> {product.price} EGP</p>
                <p className='Rate'><i className='fa-solid fa-star text-warning'></i> {product.ratingsAverage}</p>
              </div>
            </Link> 
              <button className='btn btn-info w-100 my-1' onClick={()=>{addToCart(product._id)}}  data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" >+Add</button>
            </div>
        </div>

        } )}
<OffocanvasCart></OffocanvasCart>
    </div>
    <div className='row'>
    <nav aria-label="Page navigation example" className=' w-auto m-auto my-5'>
  <ul className="pagination">
    <li className="page-item ">
      <a className="page-link"  aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {pagesArr.map((ele , i)=>{
      return<>
      <li key={i} className="page-item"><a onClick={()=>{getPages(ele)}} className="page-link">{ele}</a></li>
      
      </>
    })}
   
    <li className="page-item">
      <a className="page-link"  aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</div>
    </>
  )
}
