"use client";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastProps } from "../types/types";

const Alert = ()=>{
return <ToastContainer />
}

export const ShowToast = (props: ToastProps)=>{
  if(props.category === "success"){
    return(
    toast.success(props.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    )
  }
  else{
    return(
    toast.error(props.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    )
  }
}

export default Alert
