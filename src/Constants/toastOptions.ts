import { Bounce, ToastOptions } from 'react-toastify';

const TOAST_OPTIONS: ToastOptions = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
};

export default TOAST_OPTIONS;
