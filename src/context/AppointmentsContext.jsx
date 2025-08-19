/** @format */

import { AppointmentsService } from "../services";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const AppointmentsContext = createContext();

export const AppointmentsProvider = ({ children }) => {
  const [usersAppointments, setUsersAppointments] = useState([]);
  const [doctorsAppointments, setDoctorsAppointments] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [slots, setSlots] = useState([]);

  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    // Preload user/doctors appointments on mount (errors ignored silently)
    userAppointments().catch(() => {});
    doctorAppointments().catch(() => {});
  }, []);

  const setLoadingKey = (key, value) =>
    setLoading((prev) => ({ ...prev, [key]: value }));
  const setErrorKey = (key, value) =>
    setError((prev) => ({ ...prev, [key]: value }));

  const doctorAppointmentsSchedule = async (data) => {
    setLoadingKey("doctorAppointmentsSchedule", true);
    try {
      const response = await AppointmentsService.doctorAppointmentsSchedule(
        data
      );
      toast.success("Schedule updated");
      return response?.data;
    } catch (err) {
      setErrorKey("doctorAppointmentsSchedule", err?.message || "Failed");
      toast.error("Failed to update schedule");
      throw err;
    } finally {
      setLoadingKey("doctorAppointmentsSchedule", false);
    }
  };

  const checkDoctorAvailabilitySlots = async (doctorId, date) => {
    setLoadingKey("checkDoctorAvailabilitySlots", true);
    try {
      const response = await AppointmentsService.checkDoctorAvailabilitySlots(
        doctorId,
        date
      );
      const data = response?.data?.data || response?.data || [];
      setSlots(Array.isArray(data) ? data : []);
      return data;
    } catch (err) {
      setErrorKey("checkDoctorAvailabilitySlots", err?.message || "Failed");
      throw err;
    } finally {
      setLoadingKey("checkDoctorAvailabilitySlots", false);
    }
  };

  const userBookingAppointments = async (data) => {
    setLoadingKey("userBookingAppointments", true);
    try {
      const response = await AppointmentsService.userBookingAppointments(data);
      toast.success("Appointment booked");
      await userAppointments();
      return response?.data;
    } catch (err) {
      setErrorKey("userBookingAppointments", err?.message || "Failed");
      toast.error(err?.response?.data?.data || "Failed to book appointment");
      throw err;
    } finally {
      setLoadingKey("userBookingAppointments", false);
    }
  };
  const userAppointments = async () => {
    setLoadingKey("userAppointments", true);
    try {
      const response = await AppointmentsService.userAppointments();
      console.log("user appointments ", response);
      const data = response?.data?.data || response?.data || [];
      setUsersAppointments(Array.isArray(data) ? data : []);
      return data;
    } catch (err) {
      setErrorKey("userAppointments", err?.message || "Failed");
      throw err;
    } finally {
      setLoadingKey("userAppointments", false);
    }
  };
  const userCancelAppointment = async (appointmentId) => {
    setLoadingKey("userCancelAppointment", true);
    try {
      await AppointmentsService.userCancelAppointment(appointmentId);
      toast.success("Appointment cancelled");
      await userAppointments();
    } catch (err) {
      setErrorKey("userCancelAppointment", err?.message || "Failed");
      toast.error("Failed to cancel appointment");
      throw err;
    } finally {
      setLoadingKey("userCancelAppointment", false);
    }
  };
  const doctorAppointments = async () => {
    setLoadingKey("doctorAppointments", true);
    try {
      const response = await AppointmentsService.doctorAppointments();
      console.log("Appointments Response", response);
      const data = response?.data?.data || response?.data || [];
      setDoctorsAppointments(Array.isArray(data) ? data : []);
      return data;
    } catch (err) {
      setErrorKey("doctorAppointments", err?.message || "Failed");
      throw err;
    } finally {
      setLoadingKey("doctorAppointments", false);
    }
  };
  const appointmentStatus = async (appointmentId) => {
    setLoadingKey("appointmentStatus", true);
    try {
      await AppointmentsService.appointmentStatus(appointmentId);
      toast.success("Appointment updated");
      await doctorAppointments();
    } catch (err) {
      setErrorKey("appointmentStatus", err?.message || "Failed");
      toast.error("Failed to update appointment");
      throw err;
    } finally {
      setLoadingKey("appointmentStatus", false);
    }
  };
  const doctorAppointmentsCancel = async (appointmentId) => {
    setLoadingKey("doctorAppointmentsCancel", true);
    try {
      await AppointmentsService.doctorAppointmentsCancel(appointmentId);
      toast.success("Appointment cancelled");
      await doctorAppointments();
    } catch (err) {
      setErrorKey("doctorAppointmentsCancel", err?.message || "Failed");
      toast.error("Failed to cancel appointment");
      throw err;
    } finally {
      setLoadingKey("doctorAppointmentsCancel", false);
    }
  };

  const getSchedule = async (doctorId) => {
    setLoadingKey("getSchedule", true);
    try {
      const response = await AppointmentsService.getSchedule(doctorId);
      const data =
        response?.data?.schedule ||
        response?.data?.data ||
        response?.data ||
        null;
      setSchedule(data);
      return data;
    } catch (err) {
      setErrorKey("getSchedule", err?.message || "Failed");
      throw err;
    } finally {
      setLoadingKey("getSchedule", false);
    }
  };

  return (
    <AppointmentsContext.Provider
      value={{
        // state
        usersAppointments,
        doctorsAppointments,
        schedule,
        slots,
        loading,
        error,
        // actions
        doctorAppointmentsSchedule,
        checkDoctorAvailabilitySlots,
        userBookingAppointments,
        userAppointments,
        userCancelAppointment,
        doctorAppointments,
        appointmentStatus,
        doctorAppointmentsCancel,
        getSchedule,
      }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentsContext);
