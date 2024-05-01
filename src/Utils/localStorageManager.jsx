export const KEY_ACCESS_TOKEN = 'access_token';
export const MASTER_USER = 'master_user';
export const PATIENT_USER = 'patient_user';
export const HOSPITAL_ID = 'hospital_id';

export const getItem = (key)=>{
     // console.log(key);
    return localStorage.getItem(key);
}

export const setItem = (key, value)=>{
     localStorage.setItem(key, value);
}

export const removeItem = (key)=>{
     localStorage.removeItem(key);
}