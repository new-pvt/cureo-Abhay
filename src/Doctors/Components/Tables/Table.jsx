import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";
import toast from "react-hot-toast";
import { axiosClient } from "../../../Utils/axiosClient";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";


const Table = ({ data, appointmentBy }) => {
    const { pathname } = useLocation();
    const [statusOptions, setStatusOption] = useState(null);
    const [loading, setLoading] = useState(false);
    const ref = useClickAwayToClose(() => setStatusOption(null));
    const tableHeading = [
        "Sr No",
        "Patient’s Name",
        "Gender",
        "Contact No",
        appointmentBy == "Token Appointments" ? "Token No." : "Time",
        "Records",
        "Status",
    ];

    const handleStatusChange = async (id, status, remark, i) => {
        if (appointmentBy == "Online Appointments") {
            setLoading(true);
            try {
                const response = await axiosClient.put(
                    `/v2/updateUserAppointmentStatus/${id}`,
                    { status, remark }
                );
                if (response.status === "ok") {
                    await data.refetch();
                    setStatusOption(null);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        } else {
            try {
            setLoading(true);
                const response = await axiosClient.put(
                    `/v2/updateAppointmentByTokenUserAppointmentStatus/${id}`,
                    { status, remark }
                );
                if (response.status === "ok") {
                    await data.refetch();
                    setStatusOption(null);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div
            className={` ${pathname == "/doctor/dashboard" ? "h-[calc(100vh-294px)]" : "h-[calc(100vh-243px)]"}  w-full overflow-auto md:no-scrollbar mt-[29px]`}
        >
            <table className=" relative w-full text-center">
                <thead className="sticky z-10 top-0 bg-c2 text-center">
                    <tr className="whitespace-nowrap">
                        {tableHeading.map((heading, i) => (
                            <th
                                key={heading}
                                className={`font-f2 font-w1 px-[49px] md:px-0 leading-[18.04px] md:text-[13px] pb-4 text-c16`}
                            >
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.isLoading ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="p-2 font-f3 font-w1 text-c16 text-[13px] text-left md:text-center pl-10 md:pl-0"
                            >
                                Loading...
                            </td>
                        </tr>
                    ) : data?.error ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="p-2 font-f3 font-w1 text-c16 text-[13px] text-left md:text-center pl-10 md:pl-0"
                            >
                                An Error Occured {data?.error?.message}
                            </td>
                        </tr>
                    ) : data?.data?.length == 0 ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="p-2 font-f3 font-w1 text-c16 text-[13px] text-left md:text-center pl-10 md:pl-0"
                            >
                                No Appointments
                            </td>
                        </tr>
                    ) : (
                        data?.data?.map((item, index) => (
                            <tr
                                key={index}
                                className="odd:dark:bg-[#D9D9D930]  even:dark:bg-c2"
                            >
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {index + 1}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.name}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.gender}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.phone}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {appointmentBy == "Token Appointments"
                                        ? item?.tokenNo
                                        : item?.AppointmentTime}
                                </td>
                                <td className="p-2 font-f3 font-w3 text-c1 text-[13px] cursor-pointer">
                                    View
                                </td>
                                <td
                                    ref={ref}
                                    className="p-2 relative select-none capitalize font-f3 font-w3 text-c9 text-[13px] cursor-pointer"
                                >
                                    <button
                                        onClick={() =>
                                            setStatusOption((prevVal) =>
                                                prevVal == item?._id
                                                    ? null
                                                    : item?._id
                                            )
                                        }
                                        className="capitalize"
                                    >
                                        {item?.status}
                                    </button>
                                    {statusOptions == item?._id && (
                                        <ul
                                            className={`absolute  text-left mt-1 z-10 ${pathname == "/doctor/dashboard" ? "right-0 mr-1" : "left-10 right-0 mx-auto"} border w-fit  rounded-[5px]`}
                                        >
                                            <li className="text-c16 px-2  hover:bg-[#B8B8BA99]">
                                                <button
                                                disabled={loading}
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            item?._id,
                                                            "pending",
                                                            "by doctor"
                                                        )
                                                    }
                                                    className="disabled:text-[#B8B8BA99] "
                                                >
                                                    Pending
                                                </button>
                                            </li>
                                            <li className="text-[#14D610]  px-2 ">
                                                <button
                                                disabled={loading}
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            item?._id,
                                                            "completed",
                                                            "by doctor"
                                                        )
                                                    }
                                                    className="disabled:text-[#B8B8BA99] "
                                                >
                                                    Completed
                                                </button>
                                            </li>
                                            <li className="text-c24 px-2 hover:bg-[#B8B8BA99]">
                                                <button
                                                disabled={loading}
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            item?._id,
                                                            "missed",
                                                            "by doctor"
                                                        )
                                                    }
                                                    className="disabled:text-[#B8B8BA99] "
                                                >
                                                    Missed
                                                </button>
                                            </li>
                                            <li className="text-c24 px-2 hover:bg-[#B8B8BA99]">
                                                <button
                                                disabled={loading}
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            item?._id,
                                                            "cancelled",
                                                            "by doctor"
                                                        )
                                                    }
                                                    className="disabled:text-[#B8B8BA99] "
                                                >
                                                    Cancel
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}

                    {/* {data?.data?.map((item, index) => (
                        <tr
                            key={index}
                            className="odd:dark:bg-[#D9D9D930]  even:dark:bg-c2"
                        >
                            <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                {index + 1}
                            </td>
                            <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                {item?.name}
                            </td>
                            <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                {item?.gender}
                            </td>
                            <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                {item?.phone}
                            </td>
                            <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                {item?.AppointmentTime}
                            </td>
                            <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                {item?.AppointmentTime}
                            </td>
                            <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                {item?.status}
                            </td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
