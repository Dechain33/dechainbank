import React, { useContext, useEffect } from "react";
import UserDataContext from "../context/userDataContext";
import { useLocation, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import options from "./options";

const AdminRequired = ({ children }) => {
  const context = useContext(UserDataContext);

  console.log(context.adminLoggedIn);

  if (context.adminLoggedIn) {
    return children;
  } else {
    toast.error("Please sign in", options);
    return <Navigate to={"/admin-login"}></Navigate>;
  }
};

export default AdminRequired;
