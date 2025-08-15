/** @format */
import React, { useEffect, useMemo, useState } from "react";
import DoctorReviewModal from "./DoctorReviewModal";
import HospitalReviewModal from "./HospitalReviewModal";

const ReviewTable = ({
  pendingItems,
  type, // "doctor" or "hospital"
  title = "",
  onApprove,
  onReject,
  isRejected,
  isApproved,
  onOpenRejectModal,
  onActivatePayment,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showHospitalModal, setShowHospitalModal] = useState(false);

  // --- search + pagination ---
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [pendingItems, searchQuery]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return pendingItems || [];
    return (pendingItems || []).filter((it) =>
      (it.name || "").toLowerCase().includes(q)
    );
  }, [pendingItems, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, currentPage]);

  // ------------------------------

  if (!pendingItems || pendingItems.length === 0) {
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

  const handleViewDetails = (item) => {
    if (type === "doctor") {
      setSelectedDoctor(item);
      setShowDoctorModal(true);
    } else {
      setSelectedHospital(item);
      setShowHospitalModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowDoctorModal(false);
    setSelectedDoctor(null);
    setShowHospitalModal(false);
    setSelectedHospital(null);
  };

  const handleApproveFromModal = (itemId) => {
    onApprove(itemId);
    handleCloseModal();
  };

  const renderInitials = (name = "") => {
    const initials = name
      .split(" ")
      .map((n) => n[0] || "")
      .join("")
      .slice(0, 3);
    const textSize =
      initials.length <= 2
        ? "text-base"
        : initials.length === 3
        ? "text-sm"
        : "text-xs";

    return (
      <span className={`text-emerald-600 font-medium ${textSize}`}>
        {initials}
      </span>
    );
  };

  const getColumns = () => {
    if (type === "doctor") {
      return [
        {
          key: "name",
          label: "Doctor",
          render: (item) => (
            <div className='flex items-center'>
              <div className='flex-shrink-0 h-10 w-10'>
                <div className='h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden'>
                  {item.profilePicture || item.profileImageUrl ? (
                    <img
                      src={item.profilePicture || item.profileImageUrl}
                      alt='Profile'
                      className='h-10 w-10 object-cover rounded-full'
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display =
                          "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center ${
                      item.profilePicture || item.profileImageUrl
                        ? "hidden"
                        : ""
                    }`}>
                    {renderInitials(item.name)}
                  </div>
                </div>
              </div>
              <div className='ml-4'>
                <div className='text-sm font-medium text-gray-900'>
                  {item.name}
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
          key: "paymentStatus",
          label: "Payment Status",
          render: (item) => (
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                item.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
              {item.isActive ? "Active" : "Inactive"}
            </span>
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
                <div className='h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center overflow-hidden'>
                  {item.profilePicture || item.profileImageUrl || item.image ? (
                    <img
                      src={
                        item.profilePicture ||
                        item.profileImageUrl ||
                        item.image
                      }
                      alt='Profile'
                      className='h-10 w-10 object-cover rounded-full'
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display =
                          "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center ${
                      item.profilePicture || item.profileImageUrl || item.image
                        ? "hidden"
                        : ""
                    }`}>
                    {renderInitials(item.name)}
                  </div>
                </div>
              </div>
              <div className='ml-4'>
                <div className='text-sm font-medium text-gray-900'>
                  {item.name}
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
      ];
    }
  };

  const columns = getColumns();

  return (
    <div className='bg-white'>
      {/* SECTION HEADING: title (left) + search (right) — outside the horizontal scroller */}
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center justify-between gap-4'>
          <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>

          <div className='ml-auto w-full sm:w-64'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search by name'
              className='w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300'
              aria-label='Search by name'
            />
          </div>
        </div>
      </div>

      {/* TABLE: this wrapper is the only thing that scrolls horizontally */}
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
            {currentItems.map((item) => (
              <tr
                key={item._id}
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
                    {!isApproved && (
                      <button
                        onClick={() => onApprove(item._id)}
                        className='bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors'>
                        Approve
                      </button>
                    )}
                    {!isRejected && (
                      <button
                        onClick={() => onReject(item._id)}
                        className='bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors'>
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleViewDetails(item)}
                      className='bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors'>
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredItems.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className='px-6 py-8 text-center text-gray-500'>
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION: outside the scroller so it doesn't move when user scrolls table */}
      <div className='px-6 py-4 flex items-center justify-between'>
        <div className='text-sm text-gray-600'>
          Showing {filteredItems.length === 0 ? 0 : currentItems.length} of{" "}
          {filteredItems.length} result(s)
        </div>

        <div className='inline-flex items-center space-x-2'>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className='px-3 py-1 rounded border text-sm disabled:opacity-50'>
            Prev
          </button>

          <div className='inline-flex items-center space-x-1'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={`px-3 py-1 rounded text-sm border ${
                  p === currentPage
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : ""
                }`}>
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className='px-3 py-1 rounded border text-sm disabled:opacity-50'>
            Next
          </button>
        </div>
      </div>

      {showDoctorModal && selectedDoctor && (
        <DoctorReviewModal
          isOpen={showDoctorModal}
          onClose={handleCloseModal}
          onApprove={handleApproveFromModal}
          doctor={selectedDoctor}
          handleDoctorReject={onReject}
          isRejected={isRejected}
          isApproved={isApproved}
        />
      )}
      {showHospitalModal && selectedHospital && (
        <HospitalReviewModal
          isOpen={showHospitalModal}
          onClose={handleCloseModal}
          onApprove={handleApproveFromModal}
          hospital={selectedHospital}
          handleHospitalReject={onReject}
          isRejected={isRejected}
          isApproved={isApproved}
        />
      )}
    </div>
  );
};

export default ReviewTable;
