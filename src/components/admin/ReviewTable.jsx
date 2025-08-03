/** @format */

import React from "react";

const ReviewTable = ({
  pendingItems,
  type, // "doctor" or "hospital"
  onApprove,
  onReject,
  onOpenRejectModal,
}) => {
  if (pendingItems.length === 0) {
    return (
      <div className='p-8 text-center'>
        <span className='text-4xl mb-4 block'>
          {type === "doctor" ? "👨‍⚕️" : "🏥"}
        </span>
        <p className='text-gray-600'>
          No pending {type} applications to review!
        </p>
      </div>
    );
  }

  const getColumns = () => {
    if (type === "doctor") {
      return [
        {
          key: "name",
          label: "Doctor",
          render: (item) => (
            <div className='flex items-center'>
              <div className='flex-shrink-0 h-10 w-10'>
                <div className='h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center'>
                  <span className='text-emerald-600 font-medium'>
                    {item.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>
              <div className='ml-4'>
                <div className='text-sm font-medium text-gray-900'>
                  {item.fullName}
                </div>
                <div className='text-sm text-gray-500'>{item.email}</div>
              </div>
            </div>
          ),
        },
        {
          key: "speciality",
          label: "Speciality",
          render: (item) => (
            <div>
              <div className='text-sm text-gray-900'>{item.speciality}</div>
              <div className='text-sm text-gray-500'>{item.mainDegree}</div>
            </div>
          ),
        },
        {
          key: "contact",
          label: "Contact",
          render: (item) => (
            <div>
              <div className='text-sm text-gray-900'>{item.phone}</div>
              <div className='text-sm text-gray-500'>{item.hospital}</div>
            </div>
          ),
        },
        {
          key: "pmdc",
          label: "PMDC Status",
          render: (item) => (
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                item.pmdcVerified
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
              {item.pmdcVerified ? "Verified" : "Not Verified"}
            </span>
          ),
        },
        {
          key: "submitted",
          label: "Submitted",
          render: (item) => (
            <span className='text-sm text-gray-500'>{item.submittedAt}</span>
          ),
        },
      ];
    } else {
      return [
        {
          key: "name",
          label: "Hospital",
          render: (item) => (
            <div className='flex items-center'>
              <div className='flex-shrink-0 h-10 w-10'>
                <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center'>
                  <span className='text-blue-600 font-medium'>
                    {item.hospitalName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>
              <div className='ml-4'>
                <div className='text-sm font-medium text-gray-900'>
                  {item.hospitalName}
                </div>
                <div className='text-sm text-gray-500'>{item.email}</div>
              </div>
            </div>
          ),
        },
        {
          key: "type",
          label: "Type & Category",
          render: (item) => (
            <div>
              <div className='text-sm text-gray-900'>{item.hospitalType}</div>
              <div className='text-sm text-gray-500'>{item.category}</div>
            </div>
          ),
        },
        {
          key: "contact",
          label: "Contact",
          render: (item) => (
            <div>
              <div className='text-sm text-gray-900'>{item.phone}</div>
              <div className='text-sm text-gray-500'>{item.city}</div>
            </div>
          ),
        },
        {
          key: "services",
          label: "Services",
          render: (item) => (
            <div className='flex flex-wrap gap-1'>
              {item.emergencyServices && (
                <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800'>
                  Emergency
                </span>
              )}
              {item.ambulanceServices && (
                <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                  Ambulance
                </span>
              )}
              {item.icuServices && (
                <span className='inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'>
                  ICU
                </span>
              )}
            </div>
          ),
        },
        {
          key: "submitted",
          label: "Submitted",
          render: (item) => (
            <span className='text-sm text-gray-500'>{item.submittedAt}</span>
          ),
        },
      ];
    }
  };

  const columns = getColumns();

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                {column.label}
              </th>
            ))}
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {pendingItems.map((item) => (
            <tr
              key={item.id}
              className='hover:bg-gray-50'>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className='px-6 py-4 whitespace-nowrap'>
                  {column.render(item)}
                </td>
              ))}
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <div className='flex space-x-2'>
                  <button
                    onClick={() => onApprove(item.id)}
                    className='bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors'>
                    Approve
                  </button>
                  <button
                    onClick={() => onOpenRejectModal(item)}
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

export default ReviewTable;
