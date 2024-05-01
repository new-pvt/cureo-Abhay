import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ManagementContext from "../../../Utils/Context/Hospital/Management/MangementContext";

const StaffsTable = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const tableHeading = [
        "Sr No",
        "Name",
        "Designation",
        "Email",
        "Contact No",
        "Gender",
        "Date Of Birth",
        "Edit",
        "Remove",
    ];

    const { getStaffData, staffsData, staffLoading, setStaffLoading } =
        useContext(ManagementContext);

    return (
        <div
            className={`h-full ${pathname == "/doctor/dashboard" ? "h-[calc(100vh-374px)]" : "h-[calc(100vh-243px)]"}  w-full overflow-auto no-scrollbar mt-[29px]`}
        >
            <table className=" relative w-full text-center border-y border-[#EBEBEC]">
                <thead className="sticky top-0 bg-inherit text-center">
                    <tr className="whitespace-nowrap">
                        {tableHeading.map((heading, i) => (
                            <th
                                key={heading}
                                className={`font-f2 font-w1 px-[49px] md:px-0 leading-[18.04px] md:text-[13px] p-4 text-c16`}
                            >
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {staffLoading ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="p-2 font-f3 font-w1 text-c16 text-[13px] "
                            >
                                Loading...
                            </td>
                        </tr>
                    ) : staffsData?.length == 0 ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="p-2 font-f3 font-w1 text-c16 text-[13px]"
                            >
                                No Staff Found
                            </td>
                        </tr>
                    ) : (
                        staffsData?.map((item, index) => (
                            <tr
                                key={index}
                                className="odd:bg-[#D9D9D930]  even:bg-inherit"
                            >
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {index + 1}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.nameOfStaff}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.designation}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.email}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.phone}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.gender}
                                </td>

                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.dateOfBirth}
                                </td>
                                <td
                                    onClick={() =>
                                        navigate(
                                            `/hospital/staff/edit/${item?._id}`
                                        )
                                    }
                                    className="p-2 font-f3 font-w3 text-c1 text-[13px] cursor-pointer"
                                >
                                    Edit
                                </td>
                                <td className="p-2 font-f3 font-w3 text-c9 text-[13px]">
                                    Remove
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

export default StaffsTable;
