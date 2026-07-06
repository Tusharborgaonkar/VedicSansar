import { Slide, toast } from "react-toastify";

export const showToast = (type , message)=>{
    let options =  {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
    };

    switch (type) {
        case 'info' : 
            toast.info(message, options);
            break;
        case 'success' : 
            toast.success(message, options);
            break;
        case 'error' : 
            toast.error(message, options);
            break;
        case 'warning' : 
            toast.warning(message, options);
            break;
        case 'default' : 
            toast(message, options);
            break;
        
    }
}