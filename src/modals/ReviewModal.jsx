/** @format */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const ReviewModal = ({
  mode = "rating-and-review",
  trigger = null,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  initialRating = 0,
  initialReview = "",
  onSubmit = () => {},
  title = "Leave a Review",
  description = "",
  submitLabel = "Submit",
}) => {
  // support controlled or uncontrolled open
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const onOpenChange = (val) => {
    if (controlledOnOpenChange) controlledOnOpenChange(val);
    else setInternalOpen(val);
  };

  const [rating, setRating] = useState(initialRating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState(initialReview || "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setRating(initialRating || 0);
  }, [initialRating, open]);

  useEffect(() => {
    setReview(initialReview || "");
  }, [initialReview, open]);

  const handleSubmit = async () => {
    onSubmit({ rating, review: review.trim() });
  };

  const Star = ({ index }) => {
    const filled = index <= (hoverRating || rating);
    return (
      <button
        type='button'
        aria-label={`${index} star${index > 1 ? "s" : ""}`}
        onClick={() => setRating(index)}
        onMouseEnter={() => setHoverRating(index)}
        onMouseLeave={() => setHoverRating(0)}
        className={`w-9 h-9 flex items-center justify-center rounded-md transition ${
          filled ? "bg-yellow-50 text-yellow-500" : "bg-gray-100 text-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-300`}>
        <svg
          viewBox='0 0 20 20'
          className='w-5 h-5'
          fill='currentColor'
          aria-hidden>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      </button>
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}>
      {/* show trigger if provided */}
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className='max-w-md'>
        <DialogHeader>
          {title && (
            <DialogTitle className='text-lg font-semibold'>{title}</DialogTitle>
          )}
          {description && (
            <DialogDescription className='text-sm text-gray-500'>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* star selector */}
        <div className='mt-4'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Your Rating
          </label>
          <div className='flex gap-2'>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                index={i}
              />
            ))}
          </div>
          <div className='mt-2 text-xs text-gray-500'>
            {rating ? `${rating} / 5` : "Select a rating"}
          </div>
        </div>

        {/* optional textarea */}
        {mode === "rating-and-review" && (
          <div className='mt-4'>
            <label
              htmlFor='review'
              className='block text-sm font-medium text-gray-700 mb-2'>
              Your Review
            </label>
            <textarea
              id='review'
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder='Tell other customers about your experience...'
              className='w-full rounded-md border border-gray-200 p-3 text-sm focus:ring-2 focus:ring-emerald-300 focus:outline-none'
            />
            <div className='mt-2 text-xs text-gray-400'>
              {review.trim().length} characters
            </div>
          </div>
        )}

        {/* actions */}
        <div className='mt-6 flex items-center justify-end gap-3'>
          <button
            type='button'
            onClick={() => onOpenChange(false)}
            className='px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200 transition'
            disabled={submitting}>
            Cancel
          </button>
          <button
            type='button'
            onClick={handleSubmit}
            disabled={!rating || submitting}
            className={`px-4 py-2 rounded-md text-sm text-white transition ${
              !rating || submitting
                ? "bg-emerald-300 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}>
            {submitting ? "Sending..." : submitLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
