/** @format */

import React from "react";
import { formatDate, formatTime } from "../../helpers/date.helper";

const getPatientDisplay = (user) => {
  if (!user) return "";
  if (typeof user === "string") return user;
  return (
    user.name ||
    user.fullName ||
    (user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : null) ||
    user.email ||
    user._id ||
    ""
  );
};

const getDoctorSubline = (doctor) => {
  if (!doctor || typeof doctor !== "object") return "";
  const speciality = Array.isArray(doctor.speciality)
    ? doctor.speciality.join(", ")
    : doctor.speciality || "";
  const hospital = doctor.hospital || "";
  return [speciality, hospital].filter(Boolean).join(" • ");
};

const AppointmentCard = ({
  appointment,
  role = "user", // 'user' | 'doctor'
  onConfirm,
  onCancel,
  showConfirm = false,
  showCancel = false,
}) => {
  const a = appointment || {};

  const personHeader =
    role === "doctor"
      ? getPatientDisplay(a.user)
      : a.doctor && typeof a.doctor === "object"
      ? a.doctor.name
      : "";

  const personSubline = role === "doctor" ? "" : getDoctorSubline(a.doctor);

  return (
    <div className='bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-2'>
      <div className='text-sm space-y-1'>
        {personHeader && (
          <div className='font-semibold text-gray-900'>
            {role === "doctor" ? "Patient" : "Doctor"}: {personHeader}
          </div>
        )}
        {personSubline && (
          <div className='text-gray-600 text-xs'>{personSubline}</div>
        )}

        <div className='flex flex-wrap items-center gap-2 mt-1'>
          <span className='px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-xs'>
            {formatDate(a.date)} {formatTime(a.time)}
          </span>
          {a.fee !== undefined && (
            <span className='px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-xs'>
              Fee: Rs. {a.fee}
            </span>
          )}
          {a.status && (
            <span
              className={`px-2 py-0.5 rounded text-xs capitalize ${
                a.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : a.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
              {a.status}
            </span>
          )}
          <span
            className={`px-2 py-0.5 rounded text-xs ${
              a.paymentDone
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-700"
            }`}>
            {a.paymentDone ? "Paid" : "Unpaid"}
          </span>
        </div>

        {a.symptoms && (
          <div className='text-gray-700 text-sm'>
            <span className='font-medium'>Symptoms:</span> {a.symptoms}
          </div>
        )}
        {a.notes && (
          <div className='text-gray-700 text-sm'>
            <span className='font-medium'>Notes:</span> {a.notes}
          </div>
        )}
      </div>

      <div className='flex gap-2'>
        {showConfirm && (
          <button
            className='px-3 py-1 rounded bg-emerald-600 text-white text-sm'
            onClick={onConfirm}>
            Confirm
          </button>
        )}
        {showCancel && (
          <button
            className='px-3 py-1 rounded bg-red-600 text-white text-sm'
            onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
