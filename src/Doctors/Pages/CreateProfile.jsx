import React, { useCallback, useEffect, useState } from "react";
import Stepper from "../../Hospitals/Components/Stepper/Stepper";
import Avatar from "../../Common/Components/Avatar/Avatar";
import Select from "../../Common/Components/Inputs/Select";
import MultiSelect from "../../Common/Components/Inputs/MultiSelect";
import { Input1 } from "../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUserData } from "../../Utils/Store/authSlice";
import toast from "react-hot-toast";
import UploadDocument from "../Components/UploadDocument/UploadDocument";
import { axiosClient } from "../../Utils/axiosClient";
import { Outlet, useNavigate } from "react-router-dom";
import useClickAwayToClose from "../../Utils/Hooks/useClickAwayToClose";
import { TextButton } from "../../Common/Components/Text/Textt";
import { logOutDoctor } from "../../Utils/Store/doctorDataSlice";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utils/localStorageManager";
import DatePicker from "../../Common/Components/Inputs/DatePicker";

const servisesOptions = [
    "Dental Cleanings",
    "Examinations and Check-ups",
    "X-rays",
    "Fillings",
    "Root Canals",
    "Extractions",
    "Crowns and Bridges",
    "Dental Implants",
    "Orthodontic Treatments (Braces, Invisalign)",
    "Periodontal (Gum) Treatments",
    "Oral Surgery",
    "Cosmetic Dentistry (Teeth Whitening, Veneers)",
    "Dentures and Partial Dentures",
    "TMJ/TMD Treatment",
    "Pediatric Dentistry (Children's Dentistry)",
    "Oral Cancer Screening",
    "Routine Check-ups",
    "Diagnosis and Treatment",
    "Chronic Disease Management",
    "Preventive Care",
    "Referrals",
    "Health Counseling",
    "Management of Minor Injuries",
    "Prescription Management",
    "Skin Examinations",
    "Acne Treatment",
    "Skin Cancer Screening",
    "Psoriasis Treatment",
    "Eczema Treatment",
    "Rosacea Treatment",
    "Hair Loss Treatment",
    "Cosmetic Dermatology (Botox, Fillers)",
    "Skin Biopsies",
    "Skin Allergy Testing",
    "Mohs Surgery",
    "Laser Therapy",
    "Comprehensive Eye Exams",
    "Prescription for Glasses and Contact Lenses",
    "Treatment for Eye Infections",
    "Cataract Surgery",
    "LASIK Surgery",
    "Glaucoma Treatment",
    "Diabetic Eye Exams",
    "Macular Degeneration Treatment",
    "Retinal Examinations",
    "Corneal Transplants",
    "Prenatal Care",
    "Labor and Delivery",
    "Gynecological Exams",
    "Family Planning Services",
    "Menopause Management",
    "Treatment for Pelvic Pain",
    "STI Testing and Treatment",
    "Infertility Evaluation and Treatment",
    "Endometrial Biopsy",
    "Hysterectomy",
    "Colposcopy",
    "Cervical Cancer Screening (Pap Smear)",
    "Orthopedic Evaluations",
    "Fracture Care",
    "Joint Replacement Surgery",
    "Sports Medicine",
    "Arthroscopic Surgery",
    "Spinal Surgery",
    "Hand Surgery",
    "Foot and Ankle Surgery",
    "Orthopedic Trauma Surgery",
    "Orthopedic Oncology",
    "Orthopedic Rehabilitation",
    "Physical Examinations",
    "Vaccinations",
    "Parasite Control",
    "Dental Care",
    "Surgical Procedures",
    "Diagnostic Imaging (X-rays, Ultrasound)",
    "Laboratory Testing (Bloodwork, Urinalysis)",
    "Emergency Care",
    "Nutritional Counseling",
    "Behavioral Counseling",
    "Microchipping",
    "End-of-Life Care (Euthanasia)",
    "Ayurvedic Consultation",
    "Panchakarma Therapies",
    "Herbal Medicine",
    "Dietary and Lifestyle Counseling",
    "Ayurvedic Massage",
    "Detoxification",
    "Stress Management",
    "Yoga and Meditation",
    "Dry Cupping",
    "Wet Cupping",
    "Massage Cupping",
    "Cupping Therapy for Pain Relief",
    "Cupping Therapy for Detoxification",
    "Cupping Therapy for Respiratory Disorders",
    "Cupping Therapy for Digestive Disorders",
    "Cupping Therapy for Skin Conditions",
    "Appendectomy",
    "Hernia Repair",
    "Gallbladder Surgery",
    "Colon Surgery",
    "Breast Surgery",
    "Thyroid Surgery",
    "Hemorrhoidectomy",
    "Skin Lesion Removal",
    "Laparoscopic Surgery",
    "Endoscopy",
    "Biopsy",
    "Homoeopathic Consultation",
    "Homoeopathic Medicine",
    "Individualized Treatment Plans",
    "Preventive Medicine",
    "Internal Medicine Consultation",
    "Disease Diagnosis and Management",
    "Medication Management",
    "Health Promotion",
    "Health Education",
    "Physical Rehabilitation",
    "Pain Management",
    "Post-surgery Rehabilitation",
    "Geriatric Rehabilitation",
    "Neurological Rehabilitation",
    "Cardiac Rehabilitation",
    "Pulmonary Rehabilitation",
    "Pediatric Rehabilitation",
    "Dentures",
    "Implant-supported Dentures",
    "Full Mouth Rehabilitation",
    "Smile Makeover",
    "Temporomandibular Joint (TMJ) Therapy",
    "Maxillofacial Prosthetics",
    "Root Canal Therapy (RCT)",
    "Pulpotomy",
    "Apicoectomy",
    "Endodontic Retreatment",
    "Dental Emergency Care for Root Canal Issues",
    "Composite Fillings",
    "Amalgam Fillings",
    "Glass Ionomer Fillings",
    "Ceramic Fillings",
    "Temporary Fillings",
    "Direct Fillings",
    "Indirect Fillings",
    "Core Build-ups",
    "Simple Tooth Extraction",
    "Surgical Tooth Extraction",
    "Wisdom Teeth Extraction",
    "Orthodontic Extraction",
    "Emergency Tooth Extraction",
];
const CreateProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [profileDropDown, setProfileDropDown] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuRef = useClickAwayToClose(() => setProfileDropDown(false));

    useEffect(() => {
        if (inputImage) {
            setPreview(URL.createObjectURL(inputImage));
        }
    }, [inputImage]);

    const handleChange = (e, val) => {
        const { id } = e.target;

        if (id === "services") {
            // Toggle the selection of the service
            const updatedServices = inputValue.services.includes(val)
                ? inputValue.services.filter((item) => item !== val)
                : [...inputValue.services, val];
            setInputValue((prevState) => ({
                ...prevState,
                services: updatedServices,
            }));
            e.target.value = "";
        } else {
            const { name, value, id } = e.target;
            if (id === "gender") {
                return setInputValue((prevState) => ({
                    ...prevState,
                    [id]: val,
                }));
            }
            if (name === "dateOfBirth") {
                console.log(name, val);
                return setInputValue((prevState) => ({
                    ...prevState,
                    [name]: val,
                }));
            }
            setInputValue((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleRemoveOption = (optionToRemove) => {
        setInputValue({
            ...inputValue,
            services: inputValue.services.filter(
                (option) => option !== optionToRemove
            ),
        });
    };

    const checkStatus = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(
                `/v2/singledoctor/${user?._id}`
            );
            if (response.status == "ok") {
                dispatch(updateUserData(response.result));
                toast.success("Checked");
                return;
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const logoutUser = () => {
        removeItem(KEY_ACCESS_TOKEN);
        dispatch(logout());
        dispatch(logOutDoctor());
        window.location.replace("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append("nameOfTheDoctor", inputValue.nameOfTheDoctor);
        data.append("qulification", inputValue.qulification);
        data.append("speciality", inputValue.speciality);
        data.append("yearOfExprience", inputValue.yearOfExprience);
        data.append("email", inputValue.email);
        data.append("phone", inputValue.phone);
        data.append("connsultationFee", inputValue.connsultationFee);
        data.append("description", inputValue.description);
        data.append("location", inputValue.location);
        data.append("landmark", inputValue.landmark);
        data.append("enterFullAddress", inputValue.enterFullAddress);
        data.append("gender", inputValue.gender);
        data.append("dateOfBirth", inputValue.dateOfBirth);
        data.append("acceptAppointments", user?.acceptAppointments);
        data.append("image", inputImage || user?.imgurl);
        inputValue.services.forEach((service) => {
            data.append("services", service);
        });

        // console.log(data);
        try {
            const response = await axiosClient.put(
                `/v2/editDoctorfile/${user?._id}`,
                data
            );

            if (response.status === "ok") {
                toast.success("Updated");
                dispatch(updateUserData(response.result));
                return;
            }
        } catch (e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };

    const [inputValue, setInputValue] = useState({
        nameOfTheDoctor: user?.nameOfTheDoctor || "",
        qulification: user?.qulification || "",
        speciality: user?.speciality || "",
        yearOfExprience: user?.yearOfExprience || "",
        email: user?.email || "",
        phone: user?.phone || "",
        gender: user?.gender || "",
        dateOfBirth: user?.dateOfBirth || "",
        connsultationFee: user?.connsultationFee || "",
        description: user?.description || "",
        location: user?.location || "",
        landmark: user?.landmark || "",
        enterFullAddress: user?.enterFullAddress || "",
        services: user?.services || [],
    });

    const formInputs = [
        {
            type: "text",
            placeholder: "Ex. John Doe",
            name: "nameOfTheDoctor",
            classname: "",
            autofocus: false,
            value: inputValue?.nameOfTheDoctor,
        },
        {
            type: "email",
            placeholder: "Ex. johndoe@gmail.com",
            name: "email",
            classname: "",
            autofocus: false,
            value: inputValue?.email,
        },
        {
            type: "number",
            placeholder: "Phone",
            name: "phone",
            classname: "",
            autofocus: false,
            value: inputValue?.phone,
        },
        {
            type: "text",
            placeholder: "Gender",
            name: "gender",
            classname: "",
            autofocus: false,
            value: inputValue?.gender,
            options: ["Male", "Female", "Other"],
        },
        {
            type: "text",
            placeholder: "Date of birth",
            name: "dateOfBirth",
            classname: "",
            autofocus: false,
            value: inputValue?.dateOfBirth,
        },

        {
            type: "text",
            placeholder: "Qualification",
            name: "qulification",
            classname: "",
            autofocus: false,
            value: inputValue?.qulification,
        },
        {
            type: "text",
            placeholder: "Speciality",
            name: "speciality",
            classname: "",
            autofocus: false,
            value: inputValue?.speciality,
        },
        {
            type: "number",
            placeholder: "Year Of Experience",
            name: "yearOfExprience",
            classname: "",
            autofocus: false,
            value: inputValue?.yearOfExprience,
        },
        {
            type: "number",
            placeholder: "Consultation Fee",
            name: "connsultationFee",
            classname: "",
            autofocus: false,
            value: inputValue?.connsultationFee,
        },
        {
            type: "text",
            placeholder: "Services",
            name: "services",
            classname: "",
            autofocus: false,
            value: inputValue?.services,
        },
        {
            type: "text",
            placeholder: "Enter Description",
            name: "description",
            classname: "",
            autofocus: false,
            value: inputValue?.description,
        },
        {
            type: "text",
            placeholder: "Enter location",
            name: "location",
            classname: "",
            autofocus: false,
            value: inputValue?.location,
        },
        {
            type: "text",
            placeholder: "Enter landmark",
            name: "landmark",
            classname: "",
            autofocus: false,
            value: inputValue?.landmark,
        },
        {
            type: "text",
            placeholder: "Enter full address",
            name: "enterFullAddress",
            classname: "",
            autofocus: false,
            value: inputValue?.enterFullAddress,
        },
    ];

    useEffect(() => {
        if (user?.verification?.status == "verified") return navigate("/");
    }, [user?.verification?.status]);

    return (
        <main className="w-full overflow-x-hidden relative min-h-[100vh] px-4 md:px-[50px] py-[30px] ">
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed bottom-0 right-0 -z-20 bg-gradient-to-l from-[#1F51C626] via-[#108ED638] to-[#1F51C638]"></div>
            <div className="md:w-[40%] h-[50%] blur-[120px] fixed left-0 bottom-0 -z-20 bg-gradient-to-b from-[#1F51C638] via-[#108ED638] to-[#1F51C626]"></div>
            <div className="flex justify-between items-center">
                <img
                    src="/Home/IMG_20240127_122502.png"
                    alt="logo"
                    className="w-[88px] md:w-[136px] h-[27px] md:h-[43px]"
                />
                <div ref={menuRef} className="relative w-fit block">
                    <Avatar
                        onclick={() => setProfileDropDown(!profileDropDown)}
                        src={user?.imgurl ? user?.imgurl : "/Navbar/human.png"}
                        className={"w-10 md:w-[52px] h-10 md:h-[52px]"}
                    />
                    {profileDropDown && (
                        <div className=" flex flex-col items-start z-20 bg-white border border-[#D9D9D980] absolute right-0 mt-3 w-[127px] rounded-[5px] ">
                            <TextButton
                                content={"Logout"}
                                onclick={logoutUser}
                                className="p-[10px] w-full text-left"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full h-full flex justify-center mt-4">
                <div className="w-full md:w-[35.37%]">
                    <Stepper
                        createdProfile={user?.nameOfTheDoctor ? true : false}
                        verified={user?.verified ? true : false}
                    />
                    {user?.verification.status == "Not Applied Yet" &&
                    user?.nameOfTheDoctor ? (
                        <UploadDocument />
                    ) : user?.verification?.status == "Not Applied Yet" &&
                      !user?.nameOfTheDoctor ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="w-full border border-[#D9D9D980] p-5 rounded-[5px] mt-[59px]">
                                <h6 className="font-f2 font-w2 text-[15px] leading-[15.6px] mb-[5px] text-c11">
                                    Create Hospital Profile
                                </h6>
                                <p className="font-f3 font-w1 leading-[15.6px] text-[13px] text-c4">
                                    Enter your details to Complete Profile
                                </p>
                                <div className="mt-[25px] flex flex-col items-center gap-[21px]">
                                    <label
                                        htmlFor="uploadImg"
                                        className="relative"
                                    >
                                        <input
                                            id="uploadImg"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) =>
                                                setInputImage(e.target.files[0])
                                            }
                                        />
                                        <Avatar
                                            src={
                                                preview
                                                    ? preview
                                                    : user?.imgurl
                                                      ? user.imgurl
                                                      : "/EditProfile/Profile.png"
                                            }
                                            className={
                                                "w-[66.97px] h-[66.97px]"
                                            }
                                        />
                                        <div className="bg-c3 absolute z-10 -bottom-2 -right-2 p-2 rounded-full">
                                            <img
                                                src="/EditProfile/Camera.svg"
                                                alt="icon"
                                                className=""
                                            />
                                        </div>
                                    </label>
                                    {formInputs?.map((input, i) =>
                                        input.name == "gender" ? (
                                            <Select
                                                id={input.name}
                                                key={input.name}
                                                options={input.options}
                                                value={inputValue.gender}
                                                setSelect={handleChange}
                                                name={input.name}
                                                placeholder="Gender"
                                                divClasses="w-full"
                                            />
                                        ) : input.name == "dateOfBirth" ? (
                                            <DatePicker
                                                key={input.name}
                                                name={input.name}
                                                value={input.value}
                                                callback={handleChange}
                                                required
                                                divClasses="w-full"
                                                icon
                                                inputClasses={
                                                    "w-full outline-none border read-only:bg-[#ECF0F9] disabled:bg-[#5D5E61BD] disabled:text-white read-only:cursor-not-allowed border-c18 h-[40px] px-4 rounded-[5px] placeholder:text-c22 placeholder:font-f3 font-[500]"
                                                }
                                                placeholder={input.placeholder}
                                            />
                                        ) : input.name == "services" ? (
                                            <MultiSelect
                                                key={input.name}
                                                handleChange={handleChange}
                                                handleRemoveOption={
                                                    handleRemoveOption
                                                }
                                                divClasses="w-full"
                                                placeholder="Enter Services"
                                                selectedOptions={
                                                    inputValue.services
                                                }
                                                options={servisesOptions}
                                            />
                                        ) : (
                                            <div
                                                key={input.name}
                                                className="flex w-full flex-col gap-[10px]"
                                            >
                                                <Input1
                                                    type={input.type}
                                                    placeholder={
                                                        input.placeholder
                                                    }
                                                    name={input.name}
                                                    autofocus={input.autofocus}
                                                    value={input.value}
                                                    onchange={handleChange}
                                                    required={true}
                                                    classname={`bg-white w-full`}
                                                />
                                            </div>
                                        )
                                    )}
                                    {/* <div className="flex items-center w-full -mt-2.5 gap-2">
                    <img src="/EditProfile/Location.svg" alt="icon" />
                    <FormSpan content="Use Current Location" />
                </div> */}
                                </div>
                            </div>

                            <PrimaryButton
                                content={"Continue"}
                                type="submit"
                                loading={loading}
                                className={`bg-c1 font-f2 w-[calc(100%-40px)] block mx-auto`}
                                h={"40px"}
                                bg={"c1"}
                                color={"white"}
                                radius={"44px"}
                                disabled={loading}
                            />
                        </form>
                    ) : user?.verification?.status == "rejected" ? (
                        <div>
                            <h2 className="text-center mt-5 font-f2 font-w2 text-c24">
                                Your Application is Rejected The reason is
                                mentioned below
                            </h2>
                            <h3 className="text-center mt-5 font-f2 font-w2 text-c24">
                                Reason :- {user?.verification?.message}
                            </h3>
                            <UploadDocument />
                        </div>
                    ) : (
                        <div>
                            <h2 className="font-f2 font-w2 text-center mt-5">
                                Your Verifcation is in Process kindly Wait Until
                                Your Verification Complete.
                            </h2>
                            <PrimaryButton
                                disabled={loading}
                                loading={loading}
                                content="Check Status"
                                onclick={checkStatus}
                                className="bg-c1 w-[130px] h-10 rounded-md text-c2 mx-auto block mt-3"
                            />
                            <div className="w-full h-[600px] mt-[25px]">
                                <img
                                    src={user?.verification?.proof}
                                    // type="application/pdf"
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                            {/* <iframe src={user?.proof} className="absolute" width="100%" height="600px" /> */}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default CreateProfile;
