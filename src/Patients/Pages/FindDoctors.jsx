import React, { useEffect, useState, memo, useMemo, useCallback } from "react";
import { Input2 } from "../../Common/Components/Inputs/Inputs";
import locationIcon from "/Find Doctors/Location-1.svg";
import searchIcon from "/Find Doctors/Search.svg";
import { H7 } from "../../Common/Components/Text/Textt";
import DoctorCard from "../Components/Find Doctors/DoctorCard";
import { axiosClient } from "../../Utils/axiosClient";
import usePlacesAutocomplete from "use-places-autocomplete";
import SearchLocation from "../../Common/Components/Inputs/SearchLocation";
import { useNavigate } from "react-router-dom";
import Illistration from "../../Common/Components/Illustration/Illistration";
import toast from "react-hot-toast";
import SkeletonForDoctorsCard from "../Components/Find Doctors/SkeletonForDoctorsCard";

const FindDoctors = () => {
    // const [searchResults, setSearchResults] = useState([]);
    // const [searchTerm, setSearchTerm] = useState("");

    // const request = debounce(async (searchTerm) => {
    //     const results = await getSearchResults(searchTerm);
    //     setSearchResults(results);
    // }, 500);

    // const debounceRequest = useCallback(
    //     (searchTerm) => request(searchTerm),
    //     []
    // );

    // const onChange = (e) => {
    //     setSearchTerm(e.target.value);
    //     debounceRequest(e.target.value);
    // };

    const {
        setValue,
        suggestions: { data },
    } = usePlacesAutocomplete({
        callbackName: "mapInit",
        requestOptions: {
            componentRestrictions: {
                country: "IN",
            },
            /* Define search scope here */
        },
        debounce: 300,
        initOnMount: true,
    });

    const navigate = useNavigate();
    const [isloading, setIsLoading] = useState(false);
    const [input1, setInput1] = useState("");
    const [location, setLocation] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [specialityList, setSpecialityList] = useState([]);
    const [doctorsData, setDoctorsData] = useState([]);

    const handleChange = useCallback(
        (value) => {
            console.log(value);
            setLocation(value);
            setValue(value);
        },
        [location, setValue]
    );
    const handleSpecialityChange = useCallback(
        (value) => {
            console.log(value);
            setSpeciality(value);

            // setSpecialityList(filtered);
        },
        [speciality]
    );
    const handleSpecialitySelect = useCallback(
        (value) => {
            console.log(value);
            setSpeciality(value);

            // setSpecialityList(filtered);
        },
        [speciality]
    );
    const handleSelect = (value) => {
        setInput1(value);
        setLocation(value);
    };
    const getDoctorsList = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get(
                `/v2/getusergetalldoctors?locationOrNameOfTheDoctor=${location + " " + speciality}`
            );
            if (response.status === "ok") {
                setDoctorsData(response.result);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getSpeacilityList = async () => {
        try {
            const response = await axiosClient.get(`/v2/getSpeacilityList`);
            setSpecialityList(response.result);
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (!location && !speciality) {
            getDoctorsList();
            getSpeacilityList();
            return;
        }
        const request = setTimeout(() => {
            getDoctorsList();
        }, 800);

        return () => clearTimeout(request);
    }, [location, speciality]);

    // useEffect(() => {
    //     getSpeacilityList();
    // }, []);

    // if (doctorsData[0] == "No Doctors Found") {
    //     return (
    //         <div className="relative">
    //             <div className="md:w-[55%] h-1/3 blur-[120px] absolute bottom-0 right-0 left-0 mx-auto -z-10 bg-gradient-to-b from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>
    //             <Illistration
    //                 src={"/Find Doctors/couldn't find anything.svg"}
    //                 errorTitle={"Sorry! We Couldn’t find anything :("}
    //                 subText={`We couldn’t find anything for “${location}”`}
    //                 imgClassName="h-[236px] md:w-[311px] md:h-[311px]"
    //                 button={{
    //                     content: "Explore",
    //                     onclick: () => {
    //                         setLocation("");
    //                         setSpeciality("");
    //                     },
    //                 }}
    //             />
    //         </div>
    //     );
    // }
    // return Array.from({ length: 10 }).map((_, i) => (
    //     <AppointmentCardSkelaton />
    // ));

    return (
        <div className="overflow-x-hidden relative min-h-[calc(100vh-108px)] mt-[40px] px-4 md:px-[50px]">
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>

            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>
            <div className="flex justify-center gap-[15px]">
                <SearchLocation
                    placeholder="Enter location"
                    name="locationOrNameOfTheDoctor"
                    icon={locationIcon}
                    options={data?.map((item) => item.description)}
                    divClasses="w-[80%] md:w-[19.27%] rounded-[106px]"
                    inputClasses="rounded-[106px] text-[13px]"
                    value={location}
                    onchange={handleChange}
                    onSelect={handleSelect}
                />

                <SearchLocation
                    type="text"
                    placeholder="Type of doctor"
                    name="speciality"
                    icon={searchIcon}
                    value={speciality}
                    options={specialityList}
                    divClasses="w-[100%] md:w-[26.10%] rounded-[106px]"
                    onchange={handleSpecialityChange}
                    onSelect={handleSpecialitySelect}
                    inputClasses="rounded-[106px] text-[13px]"
                />
            </div>
            {isloading ? (
                <div className="w-[150px] my-6 md:mt-[50px] md:mb-[22px] h-4 md:h-5 bg-[#B8B8BA99] rounded"></div>
            ) : (
                doctorsData?.length > 0 &&
                doctorsData[0] != "No Doctors Found" && (
                    <H7
                        content={`${doctorsData?.length} doctors near you`}
                        className="my-6 md:mt-[50px] md:mb-[22px]"
                    />
                )
            )}

            {isloading ? (
                Array.from({ length: 10 }).map((_, i) => (
                    <SkeletonForDoctorsCard key={i} 
                    className={`${ i == 0 ? "border-y " : "border-b" } border-dashed border-[#B8B8BA99] `}
                    
                    />
                ))
            ) : doctorsData[0] == "No Doctors Found" ? (
                <div className="relative">
                    <div className="md:w-[55%] h-1/3 blur-[120px] absolute bottom-0 right-0 left-0 mx-auto -z-10 bg-gradient-to-b from-[#1F51C6AD] via-[#108ED6] to-[#1F51C6]"></div>
                    <Illistration
                        src={"/Find Doctors/couldn't find anything.svg"}
                        errorTitle={"Sorry! We Couldn’t find anything :("}
                        subText={`We couldn’t find anything for “${location}”`}
                        imgClassName="h-[236px] md:w-[311px] md:h-[311px]"
                        button={{
                            content: "Explore",
                            onclick: () => {
                                setLocation("");
                                setSpeciality("");
                            },
                        }}
                    />
                </div>
            ) : (
                doctorsData?.map((doctorInfo, i) => (
                    // <Link key={doctorInfo?._id} to={`/doctor-details/${doctorInfo?._id}`} >
                    // <SkeletonForDoctorsCard/>
                    <DoctorCard
                        key={doctorInfo?._id}
                        doctorInfo={doctorInfo}
                        visible={true}
                        clickble={true}
                        discreption={false}
                        className={`${ i == 0 ? "border-y " : "border-b" } border-dashed border-[#B8B8BA99] `}
                    />
                    // </Link>
                ))
            )}
            {/* {doctorsData?.map((doctorInfo) => (
                // <Link key={doctorInfo?._id} to={`/doctor-details/${doctorInfo?._id}`} >
                <DoctorCard
                    key={doctorInfo?._id}
                    doctorInfo={doctorInfo}
                    visible={true}
                    clickble={true}
                    discreption={false}
                    className="border-y border-dashed border-[#B8B8BA99] "
                />
                // </Link>
            ))} */}
        </div>
    );
};

export default memo(FindDoctors);
