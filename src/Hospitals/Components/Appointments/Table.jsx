import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";

const Table = ({ data, appointmentBy }) => {
    
    const { pathname } = useLocation();
    const [statusOptions, setStatusOption] = useState(null);
    const ref = useClickAwayToClose(()=>setStatusOption(null));
    const tableHeading = [
        "Sr No",
        "Patient’s Name",
        "Gender",
        "Contact No",
        "Doctor Name",
        appointmentBy == "Token Appointments" ? "Token No." : "Time",
        "Records",
        "Status",
    ];

    return (
        <div
            className={`h-full ${pathname == "/doctor/dashboard" ? "h-[calc(100vh-374px)]" : "h-[calc(100vh-243px)]"}  w-full overflow-auto no-scrollbar mt-[29px]`}
        >
            <table className=" relative w-full text-center">
                <thead className="sticky top-0 bg-inherit text-center">
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
                                className="p-2 font-f3 font-w1 text-c16 text-[13px] "
                            >
                                Loading...
                            </td>
                        </tr>
                    ) : data?.error ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="p-2 font-f3 font-w1 text-c16 text-[13px]"
                            >
                                An Error Occured {data?.error?.message}
                            </td>
                        </tr>
                    ) : data?.data?.length == 0 ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="p-2 font-f3 font-w1 text-c16 text-[13px]"
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
                                    {item?.doctorid?.nameOfTheDoctor}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {appointmentBy == "Token Appointments"
                                        ? item?.tokenNo
                                        : item?.AppointmentTime}
                                </td>
                                <td className="p-2 font-f3 font-w2 cursor-pointer text-c1 text-[13px]">
                                    Records
                                </td>
                                <td ref={ref} className="p-2 relative select-none capitalize font-f3 font-w3 text-c9 text-[13px] cursor-pointer">
                                    <span
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
                                    </span>
                                    {statusOptions == item?._id && (
                                        <ul className="absolute text-left mt-1 z-10 right-0 border w-fit mr-1 rounded-[5px]">
                                            <li
                                                onClick={() => null}
                                                className="text-c16 px-2 hover:bg-[#B8B8BA99]"
                                            >
                                                Pending
                                            </li>
                                            <li className="text-[#14D610] px-2 hover:bg-[#B8B8BA99]">
                                                Completed
                                            </li>
                                            <li className="text-c24 px-2 hover:bg-[#B8B8BA99]">
                                                Missed
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
