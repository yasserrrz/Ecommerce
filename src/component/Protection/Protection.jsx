import React from "react";
import { Navigate } from "react-router-dom";
// Router Protection >>>
export default function Protection(props) {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}
