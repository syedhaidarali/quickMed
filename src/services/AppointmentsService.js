/** @format */

import { AppointmentsApi } from "../api";

export const AppointmentsService = {
  doctorAppointmentsSchedule: (data) =>
    AppointmentsApi.doctorAppointmentsSchedule(data),
  checkDoctorAvailabilitySlots: (doctorId, date) =>
    AppointmentsApi.checkDoctorAvailabilitySlots(doctorId, date),
  userBookingAppointments: (data) =>
    AppointmentsApi.userBookingAppointments(data),
  userAppointments: () => AppointmentsApi.userAppointments(),
  userCancelAppointment: (appointmentId) =>
    AppointmentsApi.userCancelAppointment(appointmentId),
  doctorAppointments: () => AppointmentsApi.doctorAppointments(),
  appointmentStatus: (appointmentId) =>
    AppointmentsApi.appointmentStatus(appointmentId),
  doctorAppointmentsCancel: (appointmentId) =>
    AppointmentsApi.doctorAppointmentsCancel(appointmentId),
  getSchedule: (doctorId) => AppointmentsApi.getSchedule(doctorId),
};
