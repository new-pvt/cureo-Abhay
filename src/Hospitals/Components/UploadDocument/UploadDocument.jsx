import React, { useCallback, useState } from "react";
import { H7, Span } from "../../../Common/Components/Text/Textt";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { FaRegFilePdf } from "react-icons/fa6";
import { AiOutlineFileJpg } from "react-icons/ai";
import { BsFiletypePng } from "react-icons/bs";
import { axiosClient } from "../../../Utils/axiosClient";
import { updateUserData } from "../../../Utils/Store/authSlice";

const UploadDocument = ({ getMedicalRecord }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [hospitalProof, setHospitalProof] = useState("");
    const [size, setSize] = useState("");
    const [progress, setProgress] = useState(null);
    const [err, setError] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [fileTypeError, setFileTypeError] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();
        if (
            event.dataTransfer.files[0].type == "image/jpeg" ||
            event.dataTransfer.files[0].type == "application/pdf" ||
            event.dataTransfer.files[0].type == "image/png"
        ) {
            setFileTypeError(false);
        } else {
            setFileTypeError(true);
        }
        // Handle the dropped files here
        setError(false);
        setSizeError(false);
        if (event.dataTransfer.files[0]?.size > 2097152) {
            setSizeError(true);
        }
        setHospitalProof(event.dataTransfer.files[0]);
        const fileSizeKB = event.dataTransfer.files[0].size / 1000;
        if (fileSizeKB < 1000) {
            setSize(fileSizeKB.toFixed(2) + " KB");
        } else {
            const fileSizeMB = fileSizeKB / 1000;
            setSize(fileSizeMB.toFixed(2) + " MB");
        }
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        setError(false);
        setSizeError(false);
        setFileTypeError(false);

        if (
            e.target?.files[0]?.type == "image/jpeg" ||
            e.target?.files[0]?.type == "application/pdf" ||
            e.target?.files[0]?.type == "image/png"
        ) {
            setFileTypeError(false);
        } else {
            setFileTypeError(true);
        }
        setHospitalProof(e.target.files[0]);
        if (e?.target?.files[0]?.size > 2097152) {
            setSizeError(true);
        }
        const fileSizeKB = e.target.files[0].size / 1000;

        if (fileSizeKB < 1000) {
            setSize(fileSizeKB.toFixed(2) + " KB");
        } else {
            const fileSizeMB = fileSizeKB / 1000;
            setSize(fileSizeMB.toFixed(2) + " MB");
        }
    };

    const uplaodHospitalProof = useCallback(async () => {
        if (
            hospitalProof.type === "image/jpeg" ||
            hospitalProof.type === "application/pdf" ||
            hospitalProof.type === "image/png"
        ) {
            setDisableButton(true);
            const data = new FormData();
            data.append("id", user?._id);
            data.append("role", user?.role);
            data.append("image", hospitalProof);
            try {
                const response = await axiosClient.post(
                    "/v2/uploadProof",
                    data,
                    {
                        onUploadProgress: (progressEvent) => {
                            setProgress(
                                Math.round(
                                    (progressEvent.loaded * 100) /
                                        progressEvent.total
                                )
                            );

                            // Update UI with the current upload progress if needed
                        },
                    }
                );

                if (response.status === "ok") {
                    dispatch(updateUserData(response.result));
                    console.log(response.result);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setProgress(null);
            }
        }
    }, [hospitalProof]);
    return (
        <div className=" w-full justify-center flex items-center p-4 mt-[59px] ">
            <div className="flex w-full md:w-[543px] flex-col gap-5">
                <div className="border w-full border-c17 rounded-[5px] p-5 space-y-5">
                    <div>
                        <H7 content="Hospital Registration Proof " />
                        <Span content="Upload your medical Licence" />
                    </div>

                    <input
                        type="file"
                        id="file"
                        accept=".pdf, .jpg, .png"
                        className="hidden"
                        onChange={handleChange}
                    />
                    <div className="bg-c6 ">
                        {hospitalProof ? (
                            <div className="p-4 w-full flex justify-between ">
                                <div className="flex w-full truncate items-center gap-2.5 md:gap-[14px]">
                                    {(hospitalProof?.type == "image/jpeg" && (
                                        <AiOutlineFileJpg
                                            size={30}
                                            color="#1F51C6"
                                        />
                                    )) ||
                                        (hospitalProof?.type ==
                                            "application/pdf" && (
                                            <FaRegFilePdf
                                                size={30}
                                                color="#1F51C6"
                                            />
                                        )) ||
                                        (hospitalProof?.type == "image/png" && (
                                            <BsFiletypePng
                                                size={30}
                                                color="#1F51C6"
                                            />
                                        )) ||
                                        (hospitalProof?.type ==
                                            "image/jpeg" && (
                                            <AiOutlineFileJpg
                                                size={30}
                                                color="#1F51C6"
                                            />
                                        ))}
                                    <div className="w-full ">
                                        <p className="font-f3 font-w1 text-c16 ">
                                            {hospitalProof?.name}
                                        </p>
                                        <p
                                            className={`${sizeError || fileTypeError ? "text-c9" : "text-c4"} font-f3 font-w1 leading-[15.6px] text-[13px] `}
                                        >
                                            {size}{" "}
                                            {sizeError && "  [ Maximum  2MB ]"}
                                            {fileTypeError &&
                                                "[ JPG, PNG or PDF only ]"}
                                        </p>

                                        {progress && (
                                            <div className="relative">
                                                <progress
                                                    className="rounded-[29px] w-full bg-c2 text-c1"
                                                    value={progress}
                                                    max="100"
                                                ></progress>
                                                <p className="absolute -top-3 right-0 z-50">
                                                    {progress}%
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <RxCross2
                                    color="#1F51C6"
                                    size={25}
                                    onClick={() => setHospitalProof("")}
                                    className="shrink-0"
                                />
                            </div>
                        ) : (
                            <label
                                htmlFor="file"
                                onDrop={handleDrop}
                                onDragOver={onDragOver}
                                className=" cursor-pointer rounded-[5px] border-[2px] border-dashed border-c3 w-full flex flex-col justify-center items-center px-[47px] py-[58px] md:py-[98px]"
                            >
                                <h6 className="text-c16 font-f3 font-w1 text-[15px] ">
                                    Drop your file or{" "}
                                    <b className="text-c1">browse</b>{" "}
                                </h6>
                                <Span
                                    content="Supported formats: pdf, jpg, png, jpeg."
                                    className="text-[13px] text-center"
                                />
                            </label>
                        )}
                    </div>
                </div>
                {err && (
                    <span
                        className={`font-f3 text-center font-[400] leading-[12px] text-[0.825rem] text-c24 `}
                    >
                        {err}
                    </span>
                )}

                <PrimaryButton
                    disabled={
                        sizeError || !hospitalProof || fileTypeError
                            ? true
                            : false
                    }
                    loading={progress}
                    onclick={uplaodHospitalProof}
                    className={`${sizeError || !hospitalProof || fileTypeError ? "bg-c23" : "bg-c1"} text-c2 font-f2 font-[500] w-[calc(100%-40px)] mx-auto block`}
                    w={"33.33%"}
                    h={"40px"}
                    bg={"c1"}
                    radius={"44px"}
                    content={"Continue"}
                    // reff={ref}
                />
            </div>
        </div>
    );
};

export default UploadDocument;
