
// import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { categoryContext } from '../sharedData/CategoryProvider.js';



export default function CategorySlider() {
  let {categorysList , getCategorys } = useContext(categoryContext);
  
useEffect(()=>{
  getCategorys("categories")
},[])
console.log(categorysList)

  return (<><div className='my-4 text-center OwlCarouselCategory'>
    <OwlCarousel className='owl-theme' responsive={{ 0: { items: 2},  768: { items: 4 } , 900:{items:10}}} loop dots={false} >
    {categorysList.map((element)=>{
        return<div >
        <img src={element.image} height={200} className='w-100' alt="" />
        </div>
    })}
</OwlCarousel>
<OwlCarousel className='owl-theme' responsive={{ 0: { items: 2},  768: { items: 4 } , 900:{items:7}}} loop >
    {categorysList.map((element)=>{
        return<div >
        <img src={element.image} height={200} className='w-100' alt="" />
         <h2 className='h6 fw-bold pt-2'>{element.name}</h2>
        </div>
    })}
</OwlCarousel>
    </div>
    </>

  )
}



