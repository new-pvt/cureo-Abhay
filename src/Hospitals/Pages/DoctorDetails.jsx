import React, {
    memo,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import DoctorCard from "../Components/DoctorsCard/DoctorCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosClient } from "../../Utils/axiosClient";
import {
    FormSpan,
    LinkText,
    LinkTextWithIcon,
    P3,
    Span,
} from "../../Common/Components/Text/Textt";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import Avatar from "../../Common/Components/Avatar/Avatar";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import moment from "moment";
import BoxButton from "../../Common/Components/Buttons/BoxButton";
import RatingCard from "../../Common/Components/Cards/RatingCard";
import AppointmentContext from "../../Utils/Context/Patients/AppointmentContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import LoadingDots from "../../Common/Components/Animation/LoadingDots/LoadingDots";
import {
    ACCEPT_APPOINTMENT,
    SELECTED_HOSPITAL,
    removeSessionItem,
    setSessionItem,
} from "../../Utils/SessionStorage/appointmentForm";
import toast from "react-hot-toast";

const DoctorDetails = () => {
    const { doctorId } = useParams();
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    // const [state, dispatch] = useReducer(doctorsReducer, INITIAL_STATE);
    const [services, setServices] = useState(false);

    const [doctorInfo, setDoctorInfo] = useState({});

    const getSingleDoctorDetails = async () => {
        try {
            const response = await axiosClient.get(
                `/v2/singledoctor/${doctorId}`
            );
            if (response.status === "ok") {
                setDoctorInfo(response.result);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getSingleDoctorDetails();
    }, [doctorId]);

    console.log(doctorInfo);

    return (
        <div className="overflow-x-hidden flex gap-5 relative min-h-[calc(100vh-108px)] my-[40px] px-4 md:px-[50px]">
            {/* <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>

          <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div> */}
            <main className="w-full md:w-[68.16%] flex flex-col gap-5 ">
                <P3 content="Doctor’s Profile" className={"text-[15px]"} />
                <DoctorCard
                    doctorInfo={doctorInfo}
                    discreption={true}
                    clickble={false}
                    fullDiscreption={true}
                    hideInSm={true}
                    doctorDetails
                    verified={true}
                    className="border border-solid border-c17 px-5 py-[17px]"
                />
                {/* Mobile screen hospital list from here */}
                <div className="w-full block md:hidden">
                    <P3
                        content="Upcoming Appointments"
                        className={"text-[15px]"}
                    />
                </div>
                {/* Mobile screen hospital list to here */}

                <div className="flex gap-2.5">
                    <PrimaryButton
                        content={"Reviews"}
                        className={`${services ? "bg-c2 text-c28 border border-c22" : "bg-c1 text-c2"} font-f2 w-[129px]`}
                        h={"40px"}
                        bg={"c1"}
                        radius={"44px"}
                        onclick={() => setServices(false)}
                    />
                    <PrimaryButton
                        content={"Services"}
                        className={`${services ? "bg-c1 text-c2" : "bg-c2 text-c28 border border-c22"} font-f2 w-[129px] border border-c26 `}
                        h={"40px"}
                        bg={"c1"}
                        // color={"c22"}
                        radius={"44px"}
                        onclick={() => setServices(true)}
                    />
                </div>
                {services ? (
                    <div className="flex flex-col gap-[20px]">
                        {doctorInfo?.services?.length > 0 ? (
                            doctorInfo.services.map((item, i) => (
                                <p
                                    key={i}
                                    className="text-c16 font-f3 font-w1 text-[13px]"
                                >
                                    {i + 1}. {item}
                                </p>
                            ))
                        ) : (
                            <h1>No service found</h1>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-5 h-[500px] overflow-scroll no-scrollbar">
                        {doctorInfo?.reviews?.length > 0 ? (
                            doctorInfo?.reviews?.map((review, i) => (
                                <RatingCard ratingData={review} key={i} />
                            ))
                        ) : (
                            <h1>No Reviews</h1>
                        )}
                    </div>
                )}
            </main>
            {/* Large screen hospital List From here  */}
            <aside className="w-[31.84%] hidden md:block">
                <P3 content="Upcoming Appointments" className={"text-[15px]"} />
            </aside>
            {/* Large screen hospital List to here  */}
            {/* {!user && !isLoggedIn && <PatientLogIn />} */}
        </div>
    );
};

export default memo(DoctorDetails);
