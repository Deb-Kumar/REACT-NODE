import React from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function Toast (){

    const notify = () => {
        toast.success("Wow so easy!" ,{
            position: toast.POSITION.TOP_RIGHT
        });
    };
    return (
        <>
        </>
    )
}

export default Toast;