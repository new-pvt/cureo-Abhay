import { memo, useContext, useEffect, useState } from "react";
import Dialog from "../../../Common/Components/Dialogs/Dialog";
import EnterPassword from "../Authentication/Components/EnterPassword";
import EnterMailOrPhone from "../Authentication/Components/EnterMailOrPhone";
import AuthContext from "../../../Utils/Context/Patients/AuthContext";
import { useDispatch } from "react-redux";
import { resetState } from "../../../Utils/Store/authSlice";
import SetPassword from "./Components/SetPassword";
import ForgotPassword from "./Components/ForgetPassword/ForgotPassword";

const PatientLogIn = ({ onclose }) => {
    const [currentDialog, setCurrentDialog] = useState(null);
    const [forgetPasswordDialog, setForgetPasswordDialog] = useState(null);
    const dispatch = useDispatch();
    const { signInInfo, setSignInInfo, setAuthDialog } =
        useContext(AuthContext);

    useEffect(() => {
        return () => {
            setSignInInfo({ ...signInInfo, emailOrPhone: "", password: "" });
            dispatch(resetState());
            setAuthDialog(false);
        };
    }, []);
    return (
        <>
            {forgetPasswordDialog ? (
                <Dialog>
                    <ForgotPassword
                        forgetPasswordDialog={forgetPasswordDialog}
                        setForgetPasswordDialog={setForgetPasswordDialog}
                    />
                </Dialog>
            ) : (
                <Dialog
                    onclose={onclose ? onclose : null}
                    // title={enterPassword ? "To Sign in" : ""}
                >
                    {currentDialog == "PASSWORD_OR_OTP" ? (
                        <EnterPassword
                            setCurrentDialog={setCurrentDialog}
                            setForgetPasswordDialog={setForgetPasswordDialog}
                        />
                    ) : currentDialog == "SET_PASSWORD" ? (
                        <SetPassword setCurrentDialog={setCurrentDialog} />
                    ) : (
                        <EnterMailOrPhone setCurrentDialog={setCurrentDialog} />
                    )}
                </Dialog>
            )}
        </>
    );
};

export default memo(PatientLogIn);
