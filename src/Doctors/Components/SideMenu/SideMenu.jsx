import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiSquaresFourFill } from "react-icons/pi";
import { TbEdit, TbClipboardText } from "react-icons/tb";
import { IoEnterOutline, IoSettingsOutline } from "react-icons/io5";
import {
    KEY_ACCESS_TOKEN,
    removeItem,
} from "../../../Utils/localStorageManager";
import { logout } from "../../../Utils/Store/authSlice";
import {
    logOutDoctor,
    selectedDoctorsData,
} from "../../../Utils/Store/doctorDataSlice";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../../Common/Components/Avatar/Avatar";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { RiRadioButtonFill } from "react-icons/ri";
import { IoRadioButtonOffOutline } from "react-icons/io5";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";
import { axiosClient } from "../../../Utils/axiosClient";

const SideMenu = () => {
    const { pathname } = useLocation();
    const { user } = useSelector((state) => state.auth);
    const { doctor } = useSelector((state) => state.doctorsData);
    const dispatch = useDispatch();
    const [switchAccount, setSwitchAccount] = useState(true);
    const [accountList, setAccountList] = useState([]);
    const logoutUser = () => {
        removeItem(KEY_ACCESS_TOKEN);
        dispatch(logout());
        dispatch(logOutDoctor());
        window.location.replace("/");
    };
    const ref = useClickAwayToClose(() => setSwitchAccount(false));
    const tabs = [
        {
            tabName: "Dashboard",
            path: "/doctor/dashboard",
            icon: <PiSquaresFourFill size={25} />,
        },
        {
            tabName: "Appointment",
            path: "/doctor/appointments",
            icon: <TbClipboardText size={25} />,
        },
        {
            tabName: "Settings",
            path: "/doctor/settings",
            icon: <IoSettingsOutline size={25} />,
        },
        {
            tabName: "Edit Profile",
            path: "/doctor/edit-profile",
            icon: <TbEdit size={25} />,
        },
    ];

    const handleSwitchAccount = (item) => {
        dispatch(selectedDoctorsData(item));
    };

    const multipleloginprofile = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/multipleloginprofile/${user?.doctorid}`
            );
            setAccountList(response.result);
            return;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        multipleloginprofile();
    }, []);

    return (
        <nav className="fixed flex flex-col w-[15.43%] h-[calc(100vh-60px)]">
            <img
                src="/Home/IMG_20240127_122502.png"
                alt="image"
                className="w-[136px] h-[43px] ml-[30px]  mb-[54px]"
            />
            {tabs?.map((tab) => (
                <Link
                    key={tab?.tabName}
                    to={tab?.path}
                    className={`${tab?.path == pathname ? "text-white bg-c1" : "text-c13 bg-none"} pl-[30px] py-4 rounded-[2px] font-f2 font-w2 flex text-[13px] leading-[19.5px] items-center gap-2.5`}
                >
                    {tab?.icon}
                    {tab?.tabName}
                </Link>
            ))}
            <button
                onClick={logoutUser}
                className={` text-c13 bg-none pl-[30px] py-4 rounded-[2px] font-f2 font-w2 flex text-[13px] leading-[19.5px] items-center gap-2.5`}
            >
                <IoEnterOutline size={25} /> Logout
            </button>
            <div
                ref={ref}
                className="mt-auto pl-[30px] space-y-2 transition-all ease-in-out delay-300"
            >
                <button
                    onClick={() => setSwitchAccount((prevVal) => !prevVal)}
                    className="flex items-center gap-2 font-f2 font-w2 text-[15px] text-c16 leading-[19.5px]"
                >
                    Switch Account
                    {switchAccount ? (
                        <FaAngleDown color="#108ED6" className="mt-[3px]" />
                    ) : (
                        <FaAngleUp color="#108ED6" className="mt-[1px]" />
                    )}
                </button>
                {switchAccount && (
                    <>
                        {accountList?.map((item, i) => (
                            <div
                                onClick={() => handleSwitchAccount(item)}
                                className="flex items-center gap-2.5 pr-2 cursor-pointer"
                                key={item?._id}
                            >
                                <Avatar
                                    src={item?.hospitalId === null
                                        ? item?.imgurl
                                        : item?.hospitalId?.imgurl}
                                    className="w-[39px] h-[39px]"
                                />
                                <p className="font-f2 font-w1 text-[13px] text-c16 leading-[19.5px]">
                                    {
                                        item?.hospitalId === null
                                        ? item?.nameOfTheDoctor
                                        : item?.hospitalId
                                              ?.nameOfhospitalOrClinic
                                    }
                                </p>
                                {item?._id == doctor?._id ? (
                                    <RiRadioButtonFill
                                        color="#108ED6"
                                        size={20}
                                        className="ml-auto cursor-pointer"
                                    />
                                ) : (
                                    <IoRadioButtonOffOutline
                                        color="#108ED6"
                                        size={20}
                                        className="ml-auto cursor-pointer"
                                    />
                                )}
                            </div>
                        ))}

                        {/* <div className="flex items-center gap-2.5 ">
                            <Avatar
                                src={doctor?.imgurl}
                                className="w-[39px] h-[39px]"
                            />
                            <p className="font-f2 font-w1 text-[13px] text-c16 leading-[19.5px]">
                                {doctor?.nameOfTheDoctor}
                            </p>
                            <IoRadioButtonOffOutline
                                color="#108ED6"
                                size={20}
                            />
                        </div>
                        <div className="flex items-center gap-2.5 ">
                            <Avatar
                                src={doctor?.imgurl}
                                className="w-[39px] h-[39px]"
                            />
                            <p className="font-f2 font-w1 text-[13px] text-c16 leading-[19.5px]">
                                {doctor?.nameOfTheDoctor}
                            </p>
                            <IoRadioButtonOffOutline
                                color="#108ED6"
                                size={20}
                            />
                        </div> */}
                    </>
                )}
            </div>
        </nav>
    );
};

export default SideMenu;
