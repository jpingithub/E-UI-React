import { toast } from "react-toastify";

export const toastMessageAndNavigate = (message, type, duration, path, navigate) => {
    switch (type) {
        case 'success':
            toast.success(message, {
                autoClose:duration,
                onClose: () => navigate(path), 
            });
            break;
        case 'error':
            toast.error(message, {
                onClose: () => navigate(path),
            });
            break;
        case 'info':
            toast.info(message, {
                onClose: () => navigate(path),
            });
            break;
        case 'warning':
            toast.warning(message, {
                onClose: () => navigate(path),
            });
            break;
        default:
            toast(message, {
                onClose: () => navigate(path),
            });
            break;
    }
};
