export const SELECTED_HOSPITAL = "selectedHospital";
export const ACCEPT_APPOINTMENT = "acceptAppointment";

export const getSessionItem = (key) => {
    return sessionStorage.getItem(key);
};
export const setSessionItem = (key, value) => {
    return sessionStorage.setItem(key, value);
};
export const removeSessionItem = (key) => {
    return sessionStorage.removeItem(key);
};
