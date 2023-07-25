import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../sharedData/CartContext";

export default function Navbar({ userData, LogOut }) {
  let {cartData} = useContext(CartContext);
  function toggleColor(){
    let element =  document.getElementsByTagName("body") ; 
   element[0].classList.toggle("dark");
   }
  return (
    <>
      <nav className="navbar justify-content-sm-between navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid px-lg-5 justify-content-between  " >
          <Link to={""}></Link>
        <NavLink className="cart d-block me-5  d-lg-none "  to={"cartDetails"}>
            <div class=" position-relative  me-2">
              <i class="fa-solid fa-cart-shopping"></i>
              <span
                style={{ left: "30px"}}
                class="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
              >
                {cartData?.numOfCartItems? cartData.numOfCartItems : "" }
            
              </span>
            </div>
          </NavLink>
          <Link className="navbar-brand fw-bolder me-md-5 me-sm-3" > <i class="fa-solid fa-basket-shopping m-1 text-info"></i>FreshCart</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fa-solid fa-bars fa-xl "></i>{" "}
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      aria-current="page"
                      to={"home"}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to={"about"}
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      aria-current="page"
                      to={"category"}
                    >
                      Category
                    </NavLink>
                  </li>
                </ul>

                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                  <li className="p-md-2">
                  <i class="fa-solid fa-circle-half-stroke" onClick={()=>{toggleColor()}}></i>
                  </li>
                  <li className="py-2">
                    <i className="fa fa-brands fa-facebook mx-2"></i>
                    <i className="fa fa-brands fa-twitter mx-2"></i>
                    <i className="fa fa-brands fa-spotify mx-2"></i>
                    <i className="fa fa-brands fa-linkedin mx-2"></i>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to={"profile"}
                    >
                      Profile
                    </NavLink>
                  </li>
                    <li>
                    <NavLink className="cart d-none d-lg-block nav-link " to={"cartDetails"}>
            <div class=" position-relative me-2">
              <i class="fa-solid fa-cart-shopping"></i>
              <span
                style={{ left: "30px" }}
                class="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
              >
                {cartData?.numOfCartItems? cartData.numOfCartItems : "" }
             
              </span>
            </div>
          </NavLink>
                    </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="nav-link"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="py-2">
                  <i className="fa fa-brands fa-facebook mx-2"></i>
                  <i className="fa fa-brands fa-twitter mx-2"></i>
                  <i className="fa fa-brands fa-spotify mx-2"></i>
                  <i className="fa fa-brands fa-linkedin mx-2"></i>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to={"login"}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to={"register"}
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      {/* <!-- Modal --> */}
      <div
        className="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content bg-dark">
            <div className="modal-body h4 text-white ">
              Do You Really Want To Log Out ?
            </div>
            <div className="modal-footer justify-content-between border-0 ">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Cancelle
              </button>
              <button
                type="button"
                onClick={() => {
                  LogOut();
                }}
                data-bs-dismiss="modal"
                className="btn btn-danger"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
