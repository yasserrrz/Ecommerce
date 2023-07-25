import React, {  useEffect, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from 'react-router-dom'
import Layout from './component/Layout/Layout.jsx'
import Home from './component/Home/Home.jsx'
import About from './component/About/About.jsx'
import Login from './component/Login/Login.jsx'
import Rejester from './component/Register/Register.jsx'
import NotFound from './component/NotFound/NotFound.jsx'
import Profile from './component/Profile/Profile.jsx'
import jwtDecode from 'jwt-decode'
import Welcome from './component/Welcome/Welcome.jsx'
import Protection from './component/Protection/Protection.jsx'
import ForgetPassword from './component/ForgetPassword/ForgetPassword.jsx'
import VerifyResetCode from './component/VerifyResetCode/VerifyResetCode.jsx'
import ResetPassword from './component/ResetPassword/ResetPassword.jsx'
import ProductDetails from './component/ProductDetails/ProductDetails.jsx'
import CategoryProvider from './component/sharedData/CategoryProvider.js'
import Category from './component/Category/Category.jsx'
import { CartProvider } from './component/sharedData/CartContext.js'
import CartDetails from './CartDetails/CartDetails.jsx'
import CheckOut from './component/CheckOut/CheckOut.jsx'
import OffocanvasCart from './component/OffocanvasCart/OffocanvasCart.jsx'
import AddToCart from './component/sharedData/AddToCart.js'
import Allorders from './component/Allorders/Allorders.jsx'


export default function App() {
  let [userData , setUserData] = useState(null);  
  useEffect(()=>{
    if( localStorage.getItem("token")){
      let decode = jwtDecode( localStorage.getItem("token")) ;
      console.log(decode);
      saveUserData(decode);
    }else{
    
    }
  } , [])

  function saveUserData(data){
    setUserData(data);
    console.log(data)
  }
 
  function LogOut(){
    localStorage.removeItem("token");
    setUserData(null);
    return <Navigate to={"/login"}></Navigate>
  }


  let routes = createBrowserRouter([
    {path:"/" ,element:<Layout userData={userData} LogOut={LogOut} /> ,children:[
      {path:"about" , element:<Protection><About/></Protection>},
      {index:true , element:<Welcome/>},
      {path:"home" , element:<Protection><Home></Home></Protection>},
      {path:"category" , element:<Protection><Category></Category></Protection>},
      {path:"/productDetails/:id" , element:<Protection><ProductDetails></ProductDetails></Protection>},
      {path:"cartDetails" , element:<Protection><CartDetails></CartDetails></Protection>},
      {path:"offcanvasCart" , element:<Protection><OffocanvasCart></OffocanvasCart></Protection>},
      {path:"allorders" , element:<Protection><Allorders></Allorders></Protection>},
      {path:"checkOut/:cartId" , element:<Protection><CheckOut></CheckOut></Protection>},
      {path: "profile" , element:<Protection><Profile userData={userData} /></Protection>},
      {path: "login" , element:<Login saveUserData={saveUserData}/> },
      {path:"/forgetPass" , element: <ForgetPassword/>},
      {path:"/resetCode" , element: <VerifyResetCode/>},
      {path:"/resetPass" , element:<ResetPassword/>},
      {path: "/register" , element:<Rejester saveUserData={saveUserData} />},
      {path:'*' , element:<NotFound/>},
    ]}
  ])
  return (
    <CartProvider>
       <CategoryProvider>
        <AddToCart>
         <RouterProvider router={routes}/>
        </AddToCart>
       </CategoryProvider>
    </CartProvider>
      

  )
}