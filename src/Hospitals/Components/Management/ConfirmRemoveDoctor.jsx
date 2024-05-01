import React, { useContext, useEffect } from "react";
import Dialog from "../../../Common/Components/Dialogs/Dialog";
import PrimaryButton from "../../../Common/Components/Buttons/PrimaryButton";
import ManagementContext from "../../../Utils/Context/Hospital/Management/MangementContext";

const ConfirmRemoveDoctor = ({ nameOfTheDoctor }) => {
    const {
        getDoctorsData,
        search,
        doctorsData,
        error,
        removeDoctor,
        singleDoctorsData,
        setSingleDoctorsData,
        confirmRemove,
        setConfirmRemove,
        loading
    } = useContext(ManagementContext);

    useEffect(() => {
        return () => setSingleDoctorsData({});
    }, []);

    return (
        <Dialog
            onclose={() => setConfirmRemove(false)}
            title="Remove Doctor?"
            showIcon
        >
            <h1 className="font-f3 font-w1 leading-[18px] mt-5 mb-4">
                Are You Sure Want To Remove{" "}
                <span className="text-c1 font-w3">
                    Dr. {singleDoctorsData?.nameOfTheDoctor}?
                </span>{" "}
            </h1>
            <div className="flex items-center gap-4">
                <PrimaryButton
                    content={"Cancel"}
                    onclick={() => setConfirmRemove(false)}
                    // loading={loading}
                    className={`bg-c2 font-f2 w-full mx-auto border border-#E4E8EB`}
                    h={"40px"}
                    bg={"c1"}
                    color={"#353535"}
                    radius={"44px"}
                    // disabled={!signInInfo.password}
                />
                <PrimaryButton
                    content={"Confirm"}
                    onclick={() => {
                        removeDoctor(singleDoctorsData?._id);
                    }}
                    loading={loading}
                    className={`bg-c9 font-f2 w-full mx-auto`}
                    h={"40px"}
                    bg={"c1"}
                    color={"white"}
                    radius={"44px"}
                    // disabled={!signInInfo.password}
                />
            </div>
        </Dialog>
    );
};

export default ConfirmRemoveDoctor;
