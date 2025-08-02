/** @format */

import React from "react";
import { footerSections, socialLinks } from "../assets/dummy";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='bg-emerald-900 text-emerald-100'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {footerSections.map((section, index) => (
            <div
              key={index}
              className='rounded-xl bg-emerald-800 bg-opacity-60 p-6 mb-4'>
              <h3 className='text-lg font-semibold mb-4 text-emerald-50'>
                {section.title}
              </h3>
              <ul className='space-y-2'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className='text-emerald-200 hover:text-white transition-colors duration-200'>
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className='text-emerald-200 hover:text-white transition-colors duration-200'>
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='border-t border-emerald-700 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='mb-4 md:mb-0'>
              <div className='flex items-center'>
                <svg
                  className='h-8 w-8 text-emerald-100 mr-2'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 01-1-1V4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='text-xl font-bold text-emerald-50'>
                  quickMed
                </span>
              </div>
              <p className='text-emerald-200 mt-2'>
                Pakistan's most trusted healthcare platform
              </p>
            </div>

            <div className='flex space-x-4'>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className='text-2xl hover:text-emerald-200 transition-colors duration-200'
                  title={social.name}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className='text-center mt-8 pt-8 border-t border-emerald-700'>
            <p className='text-emerald-200 text-sm'>
              © 2024 Sadeeq and Haider. All rights reserved. |
              <Link
                to='#'
                className='hover:text-white ml-1'>
                Privacy Policy
              </Link>{" "}
              |
              <Link
                to='#'
                className='hover:text-white ml-1'>
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
