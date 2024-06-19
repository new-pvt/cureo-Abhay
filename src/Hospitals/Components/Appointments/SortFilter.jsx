import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import {
    LinkText,
    P5,
    TextButton,
} from "../../../Common/Components/Text/Textt";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../../Common/Components/Avatar/Avatar";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";
import { setTabValue } from "../../../Utils/Store/tabSlice";

const SortFilter = ({
    sortFilter,
    setSortFilter,
    tabs,
    appointmentBy,
    setAppointmentBy,
}) => {
    const { pathname } = useLocation();
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const { tabValue } = useSelector((state) => state.tab);
    const dispatch = useDispatch();
    const clickAwayToClose = () => setSortFilter(false);
    const [sortTab, setSortTab] = useState(tabValue);
    const [sortBy, setSortBy] = useState(appointmentBy);
    const ref = useClickAwayToClose(clickAwayToClose);

    const handleFilter = useCallback(() => {
        dispatch(setTabValue(sortTab));
        setAppointmentBy(sortBy);
        setSortFilter(false);
    }, [tabValue, appointmentBy, sortTab, sortBy]);
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, []);

    return (
        <div className="fixed flex md:hidden justify-center items-end h-dvh inset-0 z-40 bg-c21 px-4">
            <div
                ref={ref}
                className="flex flex-col relative my-4 p-4 bg-c2 w-full rounded-[13px]"
            >
                <h6 className="font-f3 font-w1 text-c20">Filter</h6>
                <div className="border-y border-dashed border-[#5D5E6140] flex flex-col py-2 gap-2 my-2">
                    {tabs.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setSortTab(i)}
                            className={` text-left border-c27 ${sortTab == i ? "text-c1" : "text-c20"} flex items-center gap-1 font-f3 font-w1 text-[16px]`}
                        >
                            {sortTab == i ? (
                                <IoMdRadioButtonOn />
                            ) : (
                                <IoMdRadioButtonOff />
                            )}
                            {item}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col gap-2 mt-2 mb-4">
                    <button
                        onClick={(e) => setSortBy(e.target.innerText)}
                        className={` text-left border-c27 ${sortBy == "Online Appointments" ? "text-c1" : "text-c20"} font-f3 font-w1 text-[16px] flex items-center gap-1`}
                    >
                        {sortBy == "Online Appointments" ? (
                            <IoMdRadioButtonOn />
                        ) : (
                            <IoMdRadioButtonOff />
                        )}{" "}
                        Online Appointments
                    </button>
                    <button
                        onClick={(e) => setSortBy(e.target.innerText)}
                        className={` text-left border-c27 ${sortBy == "Token Appointments" ? "text-c1" : "text-c20"} font-f3 font-w1 text-[16px] flex items-center gap-1`}
                    >
                        {sortBy == "Token Appointments" ? (
                            <IoMdRadioButtonOn />
                        ) : (
                            <IoMdRadioButtonOff />
                        )}
                        Token Appointments
                    </button>
                </div>
                <PrimaryButton
                    onclick={handleFilter}
                    className={
                        "bg-c1 text-c2  font-f2 font-[600] w-full h-[32px] rounded-[80px] text-[13px]"
                    }
                    bg={"c1"}
                    content={"Apply Filter"}
                />
            </div>
        </div>
    );
};

export default memo(SortFilter);
