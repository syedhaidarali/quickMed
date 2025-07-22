/** @format */

import React, { useState } from "react";
import { navLinks } from "../assets/dummy";
import { CallButtonIcon, Logo, MenuIcon } from "../assets/svg";
import DropdownMenu from "./DropdownMenu";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";

const CallButton = ({ className = "" }) => (
  <button
    className={`px-4 py-2 bg-[#004d71] text-white rounded border border-[#004d71] font-medium hover:bg-[#014e78] transition-colors duration-150 ${className}`}
    onClick={() => {
      window.location.href = "tel:03111222398";
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }}
    aria-label='Contact Marham'>
    <CallButtonIcon />
    Call
  </button>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const handleRoute = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <header className='bg-white shadow-md sticky top-0 z-50 w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20 relative'>
          {/* Logo */}
          <Link
            to='/'
            aria-label='Marham Logo'
            className='flex items-center'
            onClick={handleRoute}>
            <img
              src='/images/logo.png'
              alt='logo'
              className='w-[120px] h-auto'
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center space-x-2 ml-4 xl:ml-8 flex-1'>
            {navLinks.map((link, idx) =>
              link.dropdown ? (
                <DropdownMenu
                  key={link.label}
                  link={link}
                  idx={idx}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                />
              ) : (
                <NavLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                />
              )
            )}
            <CallButton />
            <Link
              onClick={handleRoute}
              to='/login'
              className='ml-2 px-4 py-2 border-2 border-[#004d71] text-[#004d71] bg-white rounded font-bold hover:bg-[#f7f7f7] transition-colors duration-150'>
              Login
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='lg:hidden inline-flex items-center justify-center p-2 rounded-md text-[#014e78] hover:text-white hover:bg-[#014e78]'>
            <MenuIcon />
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className='absolute top-full left-0 w-full bg-white shadow-lg z-40 flex flex-col py-4 px-4 lg:hidden animate-fade-in'>
              {navLinks.map((link, idx) =>
                link.dropdown ? (
                  <DropdownMenu
                    key={link.label}
                    link={link}
                    idx={idx}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                    isMobile={true}
                  />
                ) : (
                  <NavLink
                    key={link.label}
                    href={link.href}
                    label={link.label}
                  />
                )
              )}
              <CallButton className='mt-2' />
              <Link
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                to='/download-app'
                className='mt-2 px-4 py-2 border-2 border-[#004d71] text-[#004d71] bg-white rounded font-bold hover:bg-[#f7f7f7] transition-colors duration-150'>
                Login
              </Link>
            </nav>
          )}

          {/* Mobile phone quick call icon */}
          <a
            href='tel:03111222398'
            aria-label='Marham Helpline'
            className='lg:hidden absolute right-16 top-1/2 -translate-y-1/2 text-[#014e78] hover:text-[#004d71]'></a>
        </div>
      </div>
    </header>
  );
};

export default Header;
