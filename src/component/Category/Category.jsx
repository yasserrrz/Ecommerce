
import React, { useContext, useEffect } from 'react'
import { categoryContext } from '../sharedData/CategoryProvider'

export default function Category() {
  let {getCategorys , categorysList} = useContext(categoryContext);
  useEffect(()=>{
    getCategorys("brands")
  },[])

  return (
    <div>
      <div className="row g-3">
        {
          categorysList.map((element)=>{
            return<div className="col-md-2">
              <img src={element.image} className='w-100' height={300} alt="" />
            </div>
          })
        }
      </div>
    </div>
  )
}
