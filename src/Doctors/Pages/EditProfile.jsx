import React, { useEffect, useState } from "react";
import { FormSpan, H7, Span } from "../../Common/Components/Text/Textt";
import Avatar from "../../Common/Components/Avatar/Avatar";
import { Input1 } from "../../Common/Components/Inputs/Inputs";
import PrimaryButton from "../../Common/Components/Buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Common/Components/Inputs/Select";
import MultiSelect from "../../Common/Components/Inputs/MultiSelect";
import ChangePassword from "../Components/Edit/ChangePassword";
import { updateDoctorsData } from "../../Utils/Store/doctorDataSlice";
import { axiosClient } from "../../Utils/axiosClient";
import toast from "react-hot-toast";
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
    "Emergency Tooth Extraction"
  ]

const EditProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const { doctor } = useSelector((state) => state.doctorsData);
    const [changePassword, seChangePassword] = useState(false);
    const [inputImage, setInputImage] = useState("");
    const [preview, setPreview] = useState("");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [inputValue, setInputValue] = useState({
        nameOfTheDoctor: doctor?.nameOfTheDoctor || "",
        qulification: doctor?.qulification || "",
        speciality: doctor?.speciality || "",
        yearOfExprience: doctor?.yearOfExprience || "",
        email: doctor?.email || "",
        phone: doctor?.phone || "",
        gender: doctor?.gender || "",
        dateOfBirth: doctor?.dateOfBirth || "",
        connsultationFee: doctor?.connsultationFee || "",
        description: doctor?.description || "",
        location: doctor?.location || "",
        landmark: doctor?.landmark || "",
        enterFullAddress: doctor?.enterFullAddress || "",
        services: doctor?.services || [],
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
            placeholder: "Qualification",
            name: "speciality",
            classname: "",
            autofocus: false,
            value: inputValue?.speciality,
        },
        {
            type: "number",
            placeholder: "Ex. 5",
            name: "yearOfExprience",
            classname: "",
            autofocus: false,
            value: inputValue?.yearOfExprience,
        },
        {
            type: "text",
            placeholder: "Ex. 500",
            name: "connsultationFee",
            classname: "",
            autofocus: false,
            value: inputValue?.connsultationFee,
        },
        {
            type: "text",
            placeholder: "Ex. Root Canal, Root Planning",
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
        if (inputImage) {
            setPreview(URL.createObjectURL(inputImage));
        }
    }, [inputImage]);

    const handleChange = (e, val) => {
        const { id } = e.target;
        console.log(val);
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
        data.append("acceptAppointments", doctor?.acceptAppointments);
        data.append("image", inputImage || doctor?.imgurl);
        inputValue.services.forEach((service) => {
            data.append("services", service);
        });

        // console.log(data);
        try {
            const response = await axiosClient.put(
                `/v2/editDoctorfile/${doctor?._id}`,
                data
            );

            if (response.status === "ok") {
                toast.success("Updated");
                dispatch(updateDoctorsData(response.result));
                return;
            }
        } catch (e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-full md:w-[43.34%] p-5 rounded-[5px] bg-c2">
                {changePassword ? (
                    <ChangePassword seChangePassword={seChangePassword} />
                ) : (
                    <>
                        <h6 className="font-f2 font-w2 text-[15px] leading-[15.6px] mb-[5px] text-c11">
                            Edit Profile
                        </h6>
                        <p className="font-f3 font-w1 leading-[15.6px] text-[13px] text-c4">
                            Enter your details to Edit Profile
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-[25px] flex flex-col items-center gap-[21px]"
                        >
                            <label htmlFor="uploadImg" className="relative">
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
                                            : doctor?.imgurl
                                              ? doctor.imgurl
                                              : "/EditProfile/Profile.png"
                                    }
                                    className={"w-[66.97px] h-[66.97px]"}
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
                                        key={input.name}
                                        id={input.name}
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
                                        handleRemoveOption={handleRemoveOption}
                                        divClasses="w-full"
                                        placeholder="Enter Services"
                                        selectedOptions={inputValue.services}
                                        options={servisesOptions}
                                    />
                                ) : (
                                    <div
                                        key={input.name}
                                        className="flex w-full flex-col gap-[10px]"
                                    >
                                        <Input1
                                            type={input.type}
                                            placeholder={input.placeholder}
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
                            <div className="flex w-full gap-[9px] md:gap-[15px]">
                                <PrimaryButton
                                    content={"Change Password"}
                                    onclick={() => seChangePassword(true)}
                                    loading={false}
                                    className={`bg-[#EDF1F9] text-[#353535] font-f2 font-w1 text-[13px] leading-[19.5px] w-full mx-auto`}
                                    h={"40px"}
                                    bg={"c1"}
                                    radius={"44px"}
                                    // disabled={!signInInfo.password}
                                />
                                <PrimaryButton
                                    content={"Save Changes"}
                                    type="submit"
                                    loading={loading}
                                    className={`bg-c1 font-f2 font-w1 text-[13px] leading-[19.5px] w-full mx-auto`}
                                    h={"40px"}
                                    bg={"c1"}
                                    color={"white"}
                                    radius={"44px"}
                                    // disabled={!signInInfo.password}
                                />
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default EditProfile;
