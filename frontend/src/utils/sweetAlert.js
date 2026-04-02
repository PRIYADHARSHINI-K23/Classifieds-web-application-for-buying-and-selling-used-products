import Swal from 'sweetalert2';

export const showAlert = (message, variant = 'info') => {
    const config = {
        title: getTitle(variant),
        text: message,
        icon: getIcon(variant),
        confirmButtonText: 'OK',
        confirmButtonColor: getButtonColor(variant),
        buttonsStyling: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        position: 'center',
        backdrop: true,
        customClass: {
            popup: 'swal2-popup',
            confirmButton: 'swal2-confirm swal2-styled'
        }
    };

    return Swal.fire(config);
};

// Replace window.alert globally
export const replaceAlert = () => {
    window.alert = (message) => showAlert(message, 'info');
};

const getTitle = (variant) => {
    switch (variant) {
        case 'success':
            return 'Success!';
        case 'error':
            return 'Error!';
        case 'warning':
            return 'Warning!';
        default:
            return 'Info';
    }
};

const getIcon = (variant) => {
    switch (variant) {
        case 'success':
            return 'success';
        case 'error':
            return 'error';
        case 'warning':
            return 'warning';
        default:
            return 'info';
    }
};

const getButtonColor = (variant) => {
    switch (variant) {
        case 'success':
            return '#28a745';
        case 'error':
            return '#dc3545';
        case 'warning':
            return '#ffc107';
        default:
            return '#3085d6';
    }
};