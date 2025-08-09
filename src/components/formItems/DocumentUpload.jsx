/** @format */
import React from "react";
import { UploadCloud, X, FileText, Plus } from "lucide-react";

const DocumentUpload = ({
  documents = [],
  onDocumentChange,
  onAddDocument,
  onRemoveDocument,
  errors = {},
}) => {
  const documentTypes = [
    "Hospital License",
    "Registration Certificate",
    "Medical Council Certificate",
    "Insurance Certificate",
    "Quality Assurance Certificate",
    "Other",
  ];

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <label className='block text-sm font-medium text-gray-700'>
          Documents
          <span className='text-red-500 ml-1'>*</span>
        </label>
        <button
          type='button'
          onClick={onAddDocument}
          disabled={documents.length >= 5}
          className='flex items-center space-x-1 text-sm text-emerald-600 hover:text-emerald-700 disabled:text-gray-400 disabled:cursor-not-allowed'>
          <Plus className='w-4 h-4' />
          <span>Add Document</span>
        </button>
      </div>

      {documents.length === 0 && (
        <div className='text-center py-8 border-2 border-dashed border-gray-300 rounded-lg'>
          <UploadCloud className='mx-auto h-12 w-12 text-gray-400' />
          <p className='mt-2 text-sm text-gray-600'>
            No documents uploaded yet. Click "Add Document" to get started.
          </p>
        </div>
      )}

      <div className='space-y-4'>
        {documents.map((doc, index) => (
          <div
            key={index}
            className='border border-gray-200 rounded-lg p-4 space-y-3'>
            <div className='flex items-center justify-between'>
              <h4 className='text-sm font-medium text-gray-700'>
                Document {index + 1}
              </h4>
              <button
                type='button'
                onClick={() => onRemoveDocument(index)}
                className='text-red-500 hover:text-red-700'>
                <X className='w-4 h-4' />
              </button>
            </div>

            {/* Document Type */}
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-1'>
                Document Type
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <select
                value={doc.documentType || ""}
                onChange={(e) =>
                  onDocumentChange(index, "documentType", e.target.value)
                }
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'>
                <option value=''>Select Document Type</option>
                {documentTypes.map((type) => (
                  <option
                    key={type}
                    value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors?.documents?.[index]?.documentType?.message && (
                <p className='text-xs text-red-600 mt-1'>
                  {errors.documents[index].documentType.message}
                </p>
              )}
            </div>

            {/* Document Name */}
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-1'>
                Document Name
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <input
                type='text'
                value={doc.documentName || ""}
                onChange={(e) =>
                  onDocumentChange(index, "documentName", e.target.value)
                }
                placeholder='Enter document name'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
              />
              {errors?.documents?.[index]?.documentName?.message && (
                <p className='text-xs text-red-600 mt-1'>
                  {errors.documents[index].documentName.message}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className='block text-xs font-medium text-gray-700 mb-1'>
                File
                <span className='text-red-500 ml-1'>*</span>
              </label>
              <div className='relative'>
                <input
                  type='file'
                  onChange={(e) =>
                    onDocumentChange(index, "file", e.target.files[0])
                  }
                  accept='.pdf,.jpg,.jpeg,.png'
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                />
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-emerald-400 transition-colors'>
                  <UploadCloud className='mx-auto h-6 w-6 text-gray-400' />
                  <p className='mt-1 text-xs text-gray-600'>
                    {doc.file ? (
                      <span className='text-green-600 font-medium'>
                        ✓ {doc.file.name}
                      </span>
                    ) : (
                      <>
                        <span className='font-medium text-emerald-600'>
                          Click to upload
                        </span>{" "}
                        or drag and drop
                        <br />
                        PDF, JPG, PNG (max 10MB)
                      </>
                    )}
                  </p>
                </div>
              </div>
              {errors?.documents?.[index]?.file?.message && (
                <p className='text-xs text-red-600 mt-1'>
                  {errors.documents[index].file.message}
                </p>
              )}
            </div>

            {/* File Preview */}
            {doc.file && (
              <div className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'>
                <FileText className='w-4 h-4 text-gray-500' />
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-gray-900 truncate'>
                    {doc.file.name}
                  </p>
                  <p className='text-xs text-gray-500'>
                    {(doc.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {errors?.documents?.message && (
        <p className='text-sm text-red-600'>{errors.documents.message}</p>
      )}
    </div>
  );
};

export default DocumentUpload;
