import { axiosClient } from "../../Utils/axiosClient";

export const getPendingAppointmentsData = async (doctor, date) => {
    const response = await axiosClient.get(
        `/v2/getAllAppointmentsForPerticularHospital/${doctor?._id}/${date}`
    );
    return response.result;
};

export const getCompleteAppointmentsData = async (doctor, date) => {
    const response = await axiosClient.get(
        `/v2/getCompleteAppointmentsForHospital/${doctor?._id}/${date}`
    );
    return response.result;
};
export const getMissedAppointmentsData = async (doctor, date) => {
    const response = await axiosClient.get(
        `/v2/getMissedAppointmentsForHospital/${doctor?._id}/${date}`
    );
    return response.result;
};

export const getPendingAppointmentsByTokenData = async (doctor, date) => {
    const response = await axiosClient.get(
        `/v2/getAllAppointmentsForPerticularHospitalByToken/${doctor?._id}/${date}/pendingByToken`
    );
    return response.result;
};
export const getCompleteAppointmentsByTokenData = async (doctor, date) => {
    const response = await axiosClient.get(
        `/v2/getCompleteAppointmentsForHospitalByToken/${doctor?._id}/${date}/completedByToken`
    );
    return response.result;
};
export const getMissedAppointmentsByTokenData = async (doctor, date) => {
    const response = await axiosClient.get(
        `/v2/getMissedAppointmentsByTokenForHospital/${doctor?._id}/${date}/missedByToken`
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
