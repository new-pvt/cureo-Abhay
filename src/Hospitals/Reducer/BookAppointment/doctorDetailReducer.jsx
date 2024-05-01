export const INITIAL_STATE = {
    dates: [],
    doctorInfo: {},
    selectedDate: 0,
    translate: 0,
    slotsData: [],
    showTimeSlot: 0,
    services: false,
    hospitalList: [],
    slotsLoading: false,
    doctorNotAvailable: false,
    error: {
        value: "",
        message: "",
    },
};

export const doctorsReducer = (state, action) => {
    switch (action.type) {
        case "ERROR":
            return { ...state, error: action.payload };
        case "SLOT_API_PENDING":
            return { ...state, slotsLoading: true, slotsData: null };
        case "SLOT_API_NOT_AVAILABLE":
            return { ...state, doctorNotAvailable: true, slotsData: null };
        case "SLOT_API_COMPLETE":
            return {
                ...state,
                slotsData: action.payload,
                doctorNotAvailable: false,
            };
        case "SLOT_API_ERROR":
            return { ...state, slotsLoading: false };
        case "SET_DOCTOR_INFO":
            return { ...state, doctorInfo: action.payload };
        case "SET_DATES":
            return { ...state, dates: action.payload };
        case "SET_SELECTED_DATE":
            return { ...state, selectedDate: action.payload };
        case "SET_TRANSLATE":
            return { ...state, translate: action.payload };
        case "SET_SLOTS_DATA":
            return { ...state, slotsData: action.payload };
        case "SET_SHOW_TIME_SLOT":
            return { ...state, showTimeSlot: action.payload };
        case "SET_SERVICES":
            return { ...state, services: action.payload };
        case "SET_HOSPITAL_LIST":
            return { ...state, hospitalList: action.payload };
        case "SET_SLOTS_LOADING":
            return { ...state, slotsLoading: action.payload };
        case "SET_DOCTOR_NOT_AVAILABLE":
            return { ...state, doctorNotAvailable: action.payload };
        default:
            return state;
    }
};
