import React, { useState } from "react";
import useClickAwayToClose from "../../Utils/Hooks/useClickAwayToClose";

const array = [
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
  
  

const Practice = ({
    options = array,
    divClasses,
    handleChange,
    selectedOptions,
    handleRemoveOption,
    required
}) => {
    // const [selectedOptions, setSelectedOptions] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const ref = useClickAwayToClose(() => setIsOpen(false));

    // const handleOptionToggle = (option) => {
    //     if (selectedOptions.includes(option)) {
    //         setSelectedOptions(
    //             selectedOptions.filter((item) => item !== option)
    //         );
    //     } else {
    //         setSelectedOptions([...selectedOptions, option]);
    //     }
    // };


    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div ref={ref} className={`relative min-h-[40px] ${divClasses} mb-[500px]`}>
            <div className="flex flex-wrap border border-gray-300 rounded p-2 focus-within:border-blue-500">
                {selectedOptions?.map((option) => (
                    <div
                        key={option}
                        className="bg-c3 flex items-center text-white rounded-md px-2 m-1 "
                    >
                        {option}
                        <button
                        type="button"
                            className="ml-2 text-sm font-bold"
                            onClick={() => handleRemoveOption(option)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    required={required}
                    className="flex-1 outline-none border-none"
                    placeholder={
                        selectedOptions?.length > 0 ? "" : "Enter Services"
                    }
                    name="services"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    // onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                />
            </div>
            {isOpen && (
                <div className="absolute bg-white border h-[200px] overflow-y-auto border-gray-300 mt-1 p-2 rounded shadow-md w-full">
                    {filteredOptions.map((option) => (
                        <div
                            key={option}
                            id="services"
                            onMouseDown={(e) => {
                                handleChange(e, option);
                                setIsOpen(false);
                            }} // Change onClick to onMouseDown
                            className={`p-2 cursor-pointer hover:bg-[#D9D9D961] ${
                                selectedOptions?.includes(option)
                                    ? " text-c1"
                                    : "bg-c2 text-gray-700"
                            }`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Practice;

// import { memo, useRef, useState } from "react";
// import { IoIosArrowDown } from "react-icons/io";
// import useClickAwayToClose from "../../../Utils/Hooks/useClickAwayToClose";

// const MultiSelect = ({
//     placeholder = "",
//     name = "",
//     divClasses = "",
//     inputClasses = "",
//     iconClasses = "",
//     value,
//     autoFocus,
//     required,
//     id,
//     options,
//     setSelect,
//     disabled,
// }) => {
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [selectedOptions, setSelectedOptions] = useState([
//         "Root Canal",
//         "Root Planning",
//     ]);
//     const ref = useClickAwayToClose(() => setShowDropdown(false));

//     return (
//         <div
//             ref={ref}
//             className={`relative h-[41px] border border-c17 text-[13px] ${divClasses} `}
//         >
//             <input
//                 onFocus={() => setShowDropdown(true)}
//                 disabled={disabled}
//                 required={required}
//                 id={id}
//                 autoFocus={autoFocus}
//                 placeholder={placeholder}
//                 name={name}
//                 onChange={() => null}
//                 value={value}
//                 className={`outline-none disabled:bg-[#D9D9D961] disabled:cursor-not-allowed disabled:text-[#706D6D] border font-f2 leading-[18.04px]  text-c19 border-c18 w-full h-full pr-[24%] md:pr-[14%] px-[15px] placeholder:text-c22 placeholder:font-f3 font-[500] border-none ${inputClasses}`}
//             />
//             <IoIosArrowDown
//                 size={20}
//                 className={`absolute right-0 top-0 bottom-0 my-auto mr-[15px] ${iconClasses}`}
//             />
//             <div className={`absolute top-0 bottom-0 my-auto block ${iconClasses}`}
//             >

//             </div>
//             {selectedOptions.map((option) => (
//                 <span
//                     key={option}
//                 >
//                     {option}
//                 </span>
//             ))}
//             {showDropdown && (
//                 <div className="absolute z-10 w-full cursor-default max-h-[200px] overflow-y-auto myScrollbar bg-c2 shadow-lg shadow-black-500/50">
//                     {options?.map((item, i) => (
//                         <h6
//                             id={id}
//                             name="abhay"
//                             key={i}
//                             onClick={(e) => {
//                                 setSelect(e, item);
//                                 setShowDropdown(false);
//                             }}
//                             className="hover:bg-c3 hover:text-c2 p-2"
//                         >
//                             {item}
//                         </h6>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default memo(MultiSelect);
