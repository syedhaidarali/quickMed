/** @format */

import React from "react";

const DoctorReviewTable = ({
  pendingDoctors,
  onApprove,
  onReject,
  onOpenRejectModal,
}) => {
  if (pendingDoctors.length === 0) {
    return (
      <div className='p-8 text-center'>
        <span className='text-4xl mb-4 block'>🎉</span>
        <p className='text-gray-600'>No pending applications to review!</p>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Doctor
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Speciality
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Contact
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              PMDC Status
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Submitted
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {pendingDoctors.map((doctor) => (
            <tr
              key={doctor.id}
              className='hover:bg-gray-50'>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0 h-10 w-10'>
                    <div className='h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center'>
                      <span className='text-emerald-600 font-medium'>
                        {doctor.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                  <div className='ml-4'>
                    <div className='text-sm font-medium text-gray-900'>
                      {doctor.fullName}
                    </div>
                    <div className='text-sm text-gray-500'>{doctor.email}</div>
                  </div>
                </div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-900'>{doctor.speciality}</div>
                <div className='text-sm text-gray-500'>{doctor.mainDegree}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-900'>{doctor.phone}</div>
                <div className='text-sm text-gray-500'>{doctor.hospital}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    doctor.pmdcVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                  {doctor.pmdcVerified ? "Verified" : "Not Verified"}
                </span>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                {doctor.submittedAt}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <div className='flex space-x-2'>
                  <button
                    onClick={() => onApprove(doctor.id)}
                    className='bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors'>
                    Approve
                  </button>
                  <button
                    onClick={() => onOpenRejectModal(doctor)}
                    className='bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors'>
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorReviewTable;
