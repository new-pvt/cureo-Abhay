import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ManagementContext from "../../../Utils/Context/Hospital/Management/MangementContext";
import { axiosClient } from "../../../Utils/axiosClient";
import toast from "react-hot-toast";
import ConfirmRemoveDoctor from "./ConfirmRemoveDoctor";
const DoctorsTable = ({ data }) => {
    const navigate = useNavigate();

    const {
        getDoctorsData,
        search,
        doctorsData,
        error,
        confirmRemove,
        setConfirmRemove,
        setSingleDoctorsData,
    } = useContext(ManagementContext);
    const { pathname } = useLocation();
    const tableHeading = [
        "Sr No",
        "Name",
        "Gender",
        "Contact No",
        "Designation",
        "Unique Id",
        "Edit",
        "Remove",
    ];

    // useEffect(() => {
    //     getDoctorsData();
    // }, [search]);

    return (
        <div className={`h-full  w-full overflow-auto no-scrollbar mt-[29px]`}>
            <table className=" relative w-full text-center border-y border-[#EBEBEC]">
                <thead className=" text-center">
                    <tr className="whitespace-nowrap">
                        {tableHeading.map((heading, i) => (
                            <th
                                key={heading}
                                className={`font-f2 font-w1 px-[49px] md:px-0 leading-[18.04px] md:text-[13px] p-3 text-c16 `}
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
                    ) : error ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="p-2 font-f3 font-w1 text-c16 text-[13px]"
                            >
                                An Error Occured {error?.message}
                            </td>
                        </tr>
                    ) : doctorsData?.length == 0 ? (
                        <tr>
                            <td
                                colSpan={8}
                                className="p-2 font-f3 font-w1 text-c16 text-[13px]"
                            >
                                No Doctors
                            </td>
                        </tr>
                    ) : (
                        doctorsData?.map((item, index) => (
                            <tr
                                key={index}
                                className="odd:bg-[#D9D9D930]  even:bg-inherit"
                            >
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {index + 1}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.nameOfTheDoctor}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.gender}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.phone}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.speciality}
                                </td>
                                <td className="p-2 font-f3 font-w1 text-c16 text-[13px]">
                                    {item?.doctorid}
                                </td>
                                <td
                                    onClick={() =>
                                        navigate(
                                            `/hospital/doctor/edit/${item?._id}`
                                        )
                                    }
                                    className="p-2 font-f3 font-w3 text-c1 text-[13px] cursor-pointer"
                                >
                                    Edit
                                </td>
                                <td
                                    onClick={() => {
                                        setSingleDoctorsData(item);
                                        setConfirmRemove(true);
                                    }}
                                    className="p-2 font-f3 font-w3 text-c9 text-[13px] cursor-pointer"
                                >
                                    Remove
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {confirmRemove ? <ConfirmRemoveDoctor /> : null}
        </div>
    );
};

export default DoctorsTable;
