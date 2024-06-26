import React, { memo, useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../../Common/Components/Avatar/Avatar";
import {
    LinkText,
    P1,
    TextButton,
} from "../../../Common/Components/Text/Textt";
import {
    KEY_ACCESS_TOKEN,
    removeItem,
} from "../../../Utils/localStorageManager";
import {
    doctorAuth,
    hospitalAuth,
    logout,
    patientAuth,
    resetState,
} from "../../../Utils/Store/authSlice";
import MobileNav from "./MobileNav";
import PatientLogIn from "../../../Patients/Components/Authentication/PatientLogIn";
import AuthContext from "../../../Utils/Context/Patients/AuthContext";
// import { options } from 'prettier-plugin-tailwindcss';

const HospitalNavbar = () => {
    const [showCard, setShowCard] = useState(false);
    const [menu, setMenu] = useState(false);
    const [profileDropDown, setProfileDropDown] = useState(false);
    const { authDialog, setAuthDialog } = useContext(AuthContext);
    const { user, isLoggedIn, getAuthenticate } = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const clickAwayToClose = () => setShowCard(false);

    const ref = useClickAwayToClose(clickAwayToClose);
    const clickAwayToCloseMenu = () => setProfileDropDown(false);
    const menuRef = useClickAwayToClose(clickAwayToCloseMenu);

    const cardContent = [
        {
            signInAs: "Paitent",
            options: [
                { text: "Sign In", role: "PATIENT" },
                { text: "Sign Up", role: "PATIENT" },
            ],
        },
        {
            signInAs: "Hospital",
            options: [
                { text: "Sign In", role: "MASTER" },
                { text: "Sign Up", role: "MASTER" },
            ],
        },
        {
            signInAs: "Doctor",
            options: [
                { text: "Sign In", role: "DOCTOR" },
                { text: "Sign Up", role: "DOCTOR" },
            ],
        },
    ];

    const navigate = useNavigate();

    const location = useLocation().pathname;

    const closeDialog = () => {
        dispatch(resetState());
    };

    const logoutUser = () => {
        removeItem(KEY_ACCESS_TOKEN);
        dispatch(logout());
        window.location.replace("/");
    };

    const handleAuthClick = (option) => {
        setAuthDialog(true);
        switch (true) {
            case option?.text == "Sign In" && option.role == "PATIENT":
                dispatch(patientAuth("signIn"));
                break;
            case option?.text == "Sign Up" && option.role == "PATIENT":
                dispatch(patientAuth("signUp"));
                break;
            case option?.text == "Sign In" && option.role == "DOCTOR":
                dispatch(doctorAuth("signIn"));
                break;
            case option?.text == "Sign Up" && option.role == "DOCTOR":
                dispatch(doctorAuth("signUp"));
                break;
            case option?.text == "Sign In" && option.role == "MASTER":
                dispatch(hospitalAuth("signIn"));
                break;
            case option?.text == "Sign Up" && option.role == "MASTER":
                dispatch(hospitalAuth("signUp"));
                break;

            default:
                break;
        }
        setShowCard(false);
    };

    const ulList = [
        { content: "Home", pathname: "/" },
        { content: "Management", pathname: "/hospital/mangement" },
        { content: "Doctors", pathname: "/hospital/doctors" },
        { content: "Appointments", pathname: "/hospital/appointments" },
    ];
    return (
        // <header className="relative mx-[50px] my-[30px]">
        <>
            <header className="flex sticky top-0 z-20 justify-between px-4 py-4 md:px-[50px] md:pt-[30px] items-center backdrop-blur-[30px] ">
                <img
                    onClick={() => navigate("/")}
                    src="/Home/IMG_20240127_122502.png"
                    alt="logo"
                    className="w-[88px] h-[27px] md:w-[136px] md:h-[43px]"
                />
                {pathname == "/hospital/create-profile" ||
                    (pathname == "/hospital/verification" ? null : (
                        <nav className="hidden md:flex items-center gap-[34px] bg-[#1F51C61F] px-[22px] py-[4px] rounded-[93px] ">
                            {ulList.map((list, i) => (
                                <Link
                                    key={i}
                                    to={list.pathname}
                                    className={`${location === list.pathname ? "text-c1 font-w3" : "text-c13 font-w2 "} p-2 `}
                                >
                                    {list.content}
                                </Link>
                            ))}
                        </nav>
                    ))}

                {!user && !isLoggedIn ? (
                    <div ref={ref} className="relative w-fit hidden md:block">
                        <PrimaryButton
                            onclick={() => setShowCard(!showCard)}
                            className={"bg-c1"}
                            w={"145px"}
                            h={"45px"}
                            bg={"c1"}
                            color={"white"}
                            radius={"44px"}
                            content={"Sign In"}
                        />
                        {showCard && (
                            <div className=" flex flex-col bg-white border border-[#D9D9D980] absolute right-0 mt-3  rounded-[5px] ">
                                {cardContent.map((items, i) => (
                                    <React.Fragment key={i}>
                                        <div className="w-[241px] flex justify-between items-center my-4 mx-4">
                                            <p className="font-f2 font-w1 leading-[15.89px] text-[0.813rem]	">
                                                {items.signInAs}{" "}
                                            </p>
                                            <div className="">
                                                {items.options.map(
                                                    (option, index) => (
                                                        <button
                                                            onClick={() =>
                                                                handleAuthClick(
                                                                    option
                                                                )
                                                            }
                                                            key={index}
                                                            className={`mr-[10px] ${index === 0 && "border-b-2 border-dashed border-[#108ED6]"} text-c14 font-f2 font-w1 text-[0.813rem] leading-[15.89px]`}
                                                        >
                                                            {option.text}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <hr />
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div
                        ref={menuRef}
                        className="relative w-fit hidden md:block"
                    >
                        <Avatar
                            onclick={() => setProfileDropDown(!profileDropDown)}
                            src={
                                user?.imgurl
                                    ? user?.imgurl
                                    : "/Navbar/human.png"
                            }
                            className={"w-[52px] h-[52px]"}
                        />
                        {profileDropDown && (
                            <div className=" flex flex-col items-start  bg-white border border-[#D9D9D980] absolute right-0 mt-3 w-[127px] rounded-[5px] ">
                                <LinkText
                                    to={"/hospital/edit-profile"}
                                    onclick={() => setProfileDropDown(false)}
                                    content={"Edit"}
                                    className=" w-full m-[10px]"
                                />
                                <hr className="w-full border border-dashed border-c17 " />
                                <TextButton
                                    content={"Logout"}
                                    onclick={logoutUser}
                                    className="p-[10px] w-full text-left"
                                />
                            </div>
                        )}
                    </div>
                )}

                <div className="relative block md:hidden ">
                    {menu ? (
                        <img
                            src="/Home/cross.svg"
                            alt="icon"
                            className=""
                            onClick={() => setMenu(!menu)}
                        />
                    ) : (
                        <img
                            src="/Home/Nav.svg"
                            alt="icon"
                            className=""
                            onClick={() => setMenu(!menu)}
                        />
                    )}
                </div>
                {menu && (
                    <MobileNav
                        data={ulList}
                        logoutUser={logoutUser}
                        setMenu={setMenu}
                    />
                )}
            </header>
            {authDialog &&
                !isLoggedIn &&
                getAuthenticate?.authType == "signIn" && (
                    <PatientLogIn onclose={closeDialog} />
                )}
        </>
    );
};

export default memo(HospitalNavbar);
