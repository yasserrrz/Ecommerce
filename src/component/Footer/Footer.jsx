import React from 'react'

export default function Footer() {
  return (
    <>
    <div className=' w-100 footer  d-flex flex-column justify-content-center align-items-center' style={{ position:"absolute", left:"0px" , right:"0px",  bottom:"0px", height:"100px" , backgroundColor:"var(--secondColor)"  }}>
        <div>
            <h4>FreshCart</h4>
        </div>
        <div>
        <i className="fa fa-brands fa-facebook mx-2"></i>
        <i className="fa fa-brands fa-twitter mx-2"></i>
        <i className="fa fa-brands fa-spotify mx-2"></i>
        <i className="fa fa-brands fa-linkedin mx-2"></i>
        </div>
    </div>
    </>

  )
}
