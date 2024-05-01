import { axiosClient } from "../../Utils/axiosClient";

export const getPendingAppointmentsData = async (doctor, date) => {
    const response = await axiosClient.get(
        `/v2/getPendingAppoinmentForDoctor/${doctor?._id}/${date}`
    );
    return response.result;
};

export const getCompleteAppointmentsData = async (doctor, date) => {
    const response = await axiosClient.get(
        `/v2/getCompletedAppoinmentForDoctor/${doctor?._id}/${date}`
    );
    return response.result;
};
export const getMissedAppointmentsData = async (doctor, date) => {
    const response = await axiosClient.get(
        `/v2/getMissedAppoinmentForDoctor/${doctor?._id}/${date}`
    );
    return response.result;
};

export const getPendingAppointmentsByTokenData = async (doctor, date) => {
    const response = await axiosClient.get(
        `/v2/getPendingAppoinmentByTokenForDoctor/${doctor?._id}/${date}`
    );
    return response.result;
};
export const getCompleteAppointmentsByTokenData = async (doctor, date) => {
    const response = await axiosClient.get(
        `/v2/getCompletedAppoinmentByTokenForDoctor/${doctor?._id}/${date}`
    );
    return response.result;
};
export const getMissedAppointmentsByTokenData = async (doctor, date) => {
    const response = await axiosClient.get(
        `/v2/getMissedAppoinmentByTokenForDoctor/${doctor?._id}/${date}`
    );
    return response.result;
};

export const getOnlineSlotDetailForDoctorForPerticularDate = async (doctorId, date) => {
    const response = await axiosClient.get(
        `/v2/getSlotDetailForDoctorForPerticularDate/${doctorId}/${date}`
    );
    return response.result;
};
export const getAppointmentByTokenSlotDetailForDoctorForPerticularDate = async (doctorId, date) => {
    const response = await axiosClient.get(
        `/v2/getAppointmentByTokenSlotDetailForDoctorForPerticularDate/${doctorId}/${date}`
    );
    return response.result;
};
