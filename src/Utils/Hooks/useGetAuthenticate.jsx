import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import PatientLogIn from "../../Patients/Components/Authentication/PatientLogIn";

const useGetAuthenticate = ()=>{
    const {pathname} = useLocation();
    const {doctorId} = useParams();
    // const { user, isLoggedIn } = useSelector((state) => state.auth);
    
    const patientsFLowPaths = [`/doctor/${doctorId}/book_appointment`, `/doctor-details/${doctorId}`, '/appointments', '/records', ]

    return (
        
            patientsFLowPaths.includes(pathname) && <PatientLogIn/>
        
    )

};

export default useGetAuthenticate;