import { memo, useContext, useEffect, useState } from "react";
import Dialog from "../../../Common/Components/Dialogs/Dialog";
import EnterPassword from "../Authentication/Components/EnterPassword";
import EnterMailOrPhone from "../Authentication/Components/EnterMailOrPhone";
import AuthContext from "../../../Utils/Context/Patients/AuthContext";
import { useDispatch } from "react-redux";
import { resetState } from "../../../Utils/Store/authSlice";

const SignUp = ({ onclose }) => {
    const [enterPassword, setEnterPassword] = useState(false);
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
        <Dialog
            onclose={onclose ? onclose : null}
            title={enterPassword ? "To Sign in" : ""}
        >
            {enterPassword ? (
                <EnterPassword />
            ) : (
                <EnterMailOrPhone setEnterPassword={setEnterPassword} />
            )}
        </Dialog>
    );
};

export default memo(SignUp);
