/** @format */

import request from "../helpers/request";

export const AppointmentsApi = {
  doctorAppointmentsSchedule: (data) =>
    request.put("/appointments/doctor/schedule", data),
  checkDoctorAvailabilitySlots: (doctorId, date) =>
    request.get(`/appointments/doctors/${doctorId}/slots?date=${date}`),
  userBookingAppointments: (data) => request.post("/appointments/book", data),
  userAppointments: () => request.get("/appointments/user"),
  userCancelAppointment: (appointmentId) =>
    request.put(`/appointments/user/${appointmentId}/cancel`),
  doctorAppointments: () => request.get("/appointments/doctor"),
  appointmentStatus: (appointmentId) =>
    request.put(`/appointments/doctor/${appointmentId}/confirm`),
  doctorAppointmentsCancel: (appointmentId) =>
    request.put(`/appointments/doctor/${appointmentId}/cancel`),
  getSchedule: (doctorId) => request.get(`/appointments/schedule/${doctorId}`),
};
