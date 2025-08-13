/** @format */
import React from "react";

export const Logo = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 600 160'
      width='180'
      height='60'>
      <defs>
        <style>
          {`
            .circle { fill: #00507a; }
            .cross { fill: #ffffff; }
            .pulse { fill: none; stroke: #ffffff; stroke-width: 6; }
            .text-blue { fill: #00507a; font: bold 38px 'Segoe UI', sans-serif; }
            .text-aqua { fill: #00bcd4; font: bold 38px 'Segoe UI', sans-serif; }
          `}
        </style>
      </defs>

      {/* Medical Icon */}
      <g transform='translate(20, 20)'>
        <circle
          cx='60'
          cy='60'
          r='60'
          className='circle'
        />
        <rect
          x='50'
          y='30'
          width='20'
          height='60'
          rx='4'
          className='cross'
        />
        <rect
          x='30'
          y='50'
          width='60'
          height='20'
          rx='4'
          className='cross'
        />
        <path
          d='M30 80 L45 80 L50 65 L60 95 L70 50 L80 90 L90 70 L105 70'
          className='pulse'
        />
      </g>

      {/* Brand Text */}
      <text
        x='160'
        y='100'
        className='text-blue'>
        Quick
      </text>
      <text
        x='290'
        y='100'
        className='text-aqua'>
        Med
      </text>
    </svg>
  );
};

export const DropdownIcon = () => (
  <svg
    className='ml-1'
    xmlns='http://www.w3.org/2000/svg'
    width='12'
    height='12'
    fill='currentColor'
    viewBox='0 0 16 16'>
    <path
      fillRule='evenodd'
      d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
    />
  </svg>
);

export const CallButtonIcon = () => (
  <svg
    className='inline-block mr-2 align-middle'
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    fill='currentColor'
    viewBox='0 0 16 16'>
    <path
      fillRule='evenodd'
      d='M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z'
    />
  </svg>
);

export const MenuIcon = () => (
  <svg
    className='h-7 w-7'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M4 6h16M4 12h16M4 18h16'
    />
  </svg>
);

export const PhoneIcon = () => (
  <svg
    className='h-6 w-6'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 5h2l.4 2M7 7h10l1 2m-1 8v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2m12-8V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2'
    />
  </svg>
);

export const Map = () => (
  <svg
    className='ml-0'
    width='14.01'
    height='17.513'
    viewBox='0 0 18 22'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9 0C6.61392 0.00270323 4.32637 0.914156 2.63915 2.53442C0.951939 4.15468 0.0028245 6.35146 9.57508e-06 8.64286C-0.00284824 10.5154 0.634084 12.3371 1.8131 13.8286C1.8131 13.8286 2.05855 14.1389 2.09864 14.1837L9 22L15.9046 14.1798C15.9406 14.1381 16.1869 13.8286 16.1869 13.8286L16.1877 13.8262C17.3661 12.3354 18.0028 10.5145 18 8.64286C17.9972 6.35146 17.0481 4.15468 15.3608 2.53442C13.6736 0.914156 11.3861 0.00270323 9 0V0ZM9 11.7857C8.35272 11.7857 7.71997 11.6014 7.18177 11.256C6.64358 10.9107 6.2241 10.4199 5.9764 9.84558C5.72869 9.27129 5.66388 8.63937 5.79016 8.02972C5.91644 7.42006 6.22814 6.86006 6.68583 6.42052C7.14353 5.98098 7.72668 5.68166 8.36152 5.56039C8.99637 5.43912 9.6544 5.50136 10.2524 5.73924C10.8504 5.97711 11.3616 6.37994 11.7212 6.89678C12.0808 7.41362 12.2727 8.02126 12.2727 8.64286C12.2716 9.47608 11.9265 10.2749 11.313 10.864C10.6994 11.4532 9.86765 11.7847 9 11.7857V11.7857Z'
      fill='#014E78'
    />
  </svg>
);

export const Search = () => (
  <svg
    width='19'
    height='19'
    viewBox='0 0 26 26'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M19.8499 19.0004C21.7248 16.9042 22.7082 14.1594 22.5908 11.3495C22.4735 8.53962 21.2647 5.88632 19.2215 3.95379C17.1784 2.02125 14.4619 0.961924 11.6499 1.00105C8.8378 1.04017 6.1519 2.17466 4.16328 4.16328C2.17466 6.1519 1.04017 8.8378 1.00105 11.6499C0.961924 14.4619 2.02125 17.1784 3.95379 19.2215C5.88632 21.2647 8.53962 22.4735 11.3495 22.5908C14.1594 22.7082 16.9042 21.7248 19.0004 19.8499L23.9764 24.8258C24.0892 24.9377 24.2417 25.0003 24.4006 25C24.5595 24.9997 24.7117 24.9364 24.8241 24.8241C24.9364 24.7117 24.9997 24.5595 25 24.4006C25.0003 24.2417 24.9377 24.0892 24.8258 23.9764L19.8499 19.0004ZM4.99921 18.5876C4.09652 17.7009 3.37786 16.6447 2.88446 15.4795C2.39106 14.3143 2.13265 13.0632 2.12407 11.7979C2.11548 10.5326 2.35688 9.27802 2.83442 8.10625C3.31195 6.93448 4.01621 5.86857 4.90678 4.96969C5.79734 4.07082 6.85667 3.35669 8.02396 2.8683C9.19124 2.3799 10.4435 2.12686 11.7088 2.1237C12.9742 2.12054 14.2277 2.36732 15.3974 2.84988C16.5671 3.33243 17.63 4.04126 18.525 4.93567L18.5885 4.99921C19.4808 5.89149 20.1885 6.95078 20.6714 8.11659C21.1542 9.2824 21.4027 10.5319 21.4027 11.7937C21.4026 13.0556 21.154 14.3051 20.6711 15.4708C20.1882 16.6366 19.4804 17.6959 18.5881 18.5881C17.6958 19.4803 16.6365 20.1881 15.4707 20.6709C14.3049 21.1538 13.0554 21.4023 11.7936 21.4022C9.24515 21.4021 6.80115 20.3897 4.99921 18.5876Z'
      fill='#014E78'
      stroke='#014E78'
    />
  </svg>
);

export const DoctorIcon = () => (
  <svg
    width='30'
    height='29'
    viewBox='0 0 30 29'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    {/* Use your DoctorIcon's full path content here */}
    <path
      fill='#BABABA'
      d='... (truncated for brevity)'
    />
  </svg>
);

export const HeartIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
         2 8.5 2 6.5 3.5 5 5.5 5 
         c1.54 0 3.04.99 3.57 2.36h1.87
         C13.46 5.99 14.96 5 16.5 5
         18.5 5 20 6.5 20 8.5c0 
         3.78-3.4 6.86-8.55 11.54L12 21.35z'
      fill='currentColor'
    />
  </svg>
);
export const CrossIcon = () => {
  return (
    <svg
      className='w-4 h-4 text-emerald-600 group-hover:text-emerald-800 transition-colors'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  );
};

export const LoadingSpinnerIcon = () => {
  return (
    <svg
      className='animate-spin h-16 w-16 text-emerald-600 drop-shadow-lg'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'>
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
      />
    </svg>
  );
};

export const MicIcon = () => (
  <svg
    className='w-5 h-5'
    fill='currentColor'
    viewBox='0 0 20 20'>
    <path
      fillRule='evenodd'
      d='M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z'
      clipRule='evenodd'
    />
  </svg>
);

export const MicOffIcon = () => (
  <svg
    className='w-4 h-4 text-white'
    fill='currentColor'
    viewBox='0 0 20 20'>
    <path
      fillRule='evenodd'
      d='M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z'
      clipRule='evenodd'
    />
  </svg>
);

export const VideoIcon = () => (
  <svg
    className='w-5 h-5'
    fill='currentColor'
    viewBox='0 0 20 20'>
    <path d='M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z' />
  </svg>
);

export const VideoOffIcon = () => (
  <svg
    className='w-4 h-4 text-white'
    fill='currentColor'
    viewBox='0 0 20 20'>
    <path
      fillRule='evenodd'
      d='M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z'
      clipRule='evenodd'
    />
  </svg>
);

export const ChatIcon = () => (
  <svg
    className='w-5 h-5'
    fill='currentColor'
    viewBox='0 0 20 20'>
    <path
      fillRule='evenodd'
      d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z'
      clipRule='evenodd'
    />
  </svg>
);

export const UsersIcon = () => (
  <svg
    className='w-5 h-5'
    fill='currentColor'
    viewBox='0 0 20 20'>
    <path d='M13 7a3 3 0 11-6 0 3 3 0 016 0zm-6 8a6 6 0 1112 0H7z' />
  </svg>
);
