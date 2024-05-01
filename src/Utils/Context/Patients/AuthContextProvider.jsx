import React, {memo, useState} from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({children}) =>{
    const [signInInfo, setSignInInfo] = useState({
        emailOrPhone:"",
        otp:"",
        password: "",
        confirmPassword:""
    })

    const [authDialog, setAuthDialog] = useState(false);

    const [requiredLogIn, setRequiredLogIn] = useState(false);

    return(
        <AuthContext.Provider value={{signInInfo, setSignInInfo, authDialog, setAuthDialog}}>
            {children}
        </AuthContext.Provider>
    )
}

export default memo(AuthContextProvider);