/** @format */

import React, { useState, useEffect, useRef } from "react";
import { navLinks } from "../assets/dummy";
import { MenuIcon } from "../assets/svg";
import { Link } from "react-router-dom";
import { useAdmin, useAuth, useDoctor, useHospital } from "../context";
import {
  DropdownMenu,
  HospitalsDropdown,
  NavLink,
} from "../components/formItems";

// ==========================
// Login Button Component
// ==========================
const LoginButton = ({ onClick, className = "", disabled }) => (
  <Link
    to={disabled ? "#" : "/login"}
    onClick={disabled ? (e) => e.preventDefault() : onClick}
    className={`px-4 py-2 border-2 border-[#004d71] text-[#004d71] bg-white rounded font-bold hover:bg-[#f7f7f7] transition-colors duration-150 ${
      disabled ? "pointer-events-none opacity-50" : ""
    } ${className}`}>
    Login
  </Link>
);

// ==========================
// Main Header Component
// ==========================
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { admin } = useAdmin();
  const menuRef = useRef(null);
  const { doctor } = useDoctor();
  const { hospital, allPublicHospital } = useHospital();
  const { user } = useAuth();

  const isAuthenticated = admin || doctor || hospital || user;

  const handleRoute = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleCloseMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // ---- new helper to render single Admin button ----
  const renderAdminButton = (isMobile = false) => {
    if (admin) {
      return (
        <NavLink
          href='/admin/dashboard'
          label='Admin Dashboard'
          onClick={isMobile ? handleCloseMenu : undefined}
        />
      );
    }

    return (
      <NavLink
        href={isAuthenticated ? "#" : "/admin/login"}
        label='Admin'
        onClick={isMobile ? handleCloseMenu : undefined}
        className={isAuthenticated ? "pointer-events-none opacity-50" : ""}
      />
    );
  };

  // ==========================
  // Desktop Navigation
  // ==========================
  const DesktopNav = () => (
    <nav className='hidden lg:flex items-center space-x-4 ml-4 xl:ml-8 flex-1'>
      {navLinks.map((link, idx) =>
        // Render dynamic Hospitals dropdown instead of static dropdown
        link.label === "Hospitals" ? (
          <HospitalsDropdown
            key={link.label}
            idx={idx}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            isMobile={false}
            onLinkClick={handleCloseMenu}
          />
        ) : link.dropdown ? (
          <DropdownMenu
            key={link.label}
            link={link}
            idx={idx}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        ) : (
          <NavLink
            key={`${link.label}-${idx}`}
            href={link.href}
            label={link.label}
          />
        )
      )}

      <div className='flex justify-end space-x-3 w-fit ms-auto'>
        <LoginButton
          className='ml-2'
          disabled={isAuthenticated}
        />
        <NavLink
          href={isAuthenticated ? "#" : "/doctor/login"}
          label='Doctor'
          className={isAuthenticated ? "pointer-events-none opacity-50" : ""}
        />
        <NavLink
          href={isAuthenticated ? "#" : "/hospital/login"}
          label='Hospital'
          className={isAuthenticated ? "pointer-events-none opacity-50" : ""}
        />

        {renderAdminButton(false)}

        {doctor && (
          <NavLink
            href='/doctor/profile'
            label='My Profile'
          />
        )}
        {hospital && (
          <NavLink
            href='/doctor/profile'
            label='My Hospital Profile'
          />
        )}
        {user && (
          <NavLink
            href='/profile'
            label='My Profile'
          />
        )}
      </div>
    </nav>
  );

  // ==========================
  // Mobile Navigation
  // ==========================
  const MobileMenu = () =>
    isMenuOpen && (
      <nav
        ref={menuRef}
        className='absolute top-full left-0 w-full bg-white shadow-lg z-40 flex flex-col py-4 px-4 lg:hidden animate-fade-in max-h-[80vh] overflow-y-auto'>
        {navLinks.map((link, idx) =>
          link.label === "Hospitals" ? (
            <HospitalsDropdown
              key={link.label}
              idx={idx}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              isMobile={true}
              onLinkClick={handleCloseMenu}
            />
          ) : link.dropdown ? (
            <DropdownMenu
              key={link.label}
              link={link}
              idx={idx}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              isMobile={true}
              onLinkClick={handleCloseMenu}
            />
          ) : (
            <NavLink
              key={link.label}
              href={link.href}
              label={link.label}
              onClick={handleCloseMenu}
            />
          )
        )}

        <LoginButton
          onClick={handleCloseMenu}
          className='mt-2'
          disabled={isAuthenticated}
        />
        <NavLink
          href={isAuthenticated ? "#" : "/doctor/login"}
          label='Doctor'
          onClick={handleCloseMenu}
          className={isAuthenticated ? "pointer-events-none opacity-50" : ""}
        />
        <NavLink
          href={isAuthenticated ? "#" : "/register/hospital"}
          label='Register Hospital'
          className={`flex items-center gap-2 px-4 py-2 bg-[#004d71] text-white rounded border border-[#004d71] font-medium hover:bg-sky-500 transition-colors duration-150 ${
            isAuthenticated ? "pointer-events-none opacity-50" : ""
          }`}
        />
        {renderAdminButton(true)}

        {doctor && (
          <NavLink
            href='/doctor/profile'
            label='My Profile'
          />
        )}
        {hospital && (
          <NavLink
            href='/doctor/profile'
            label='My Hospital Profile'
          />
        )}
        {user && (
          <NavLink
            href='/profile'
            label='My Profile'
          />
        )}
      </nav>
    );

  return (
    <header className='bg-white shadow-md sticky top-0 z-50 w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20 relative'>
          {/* Logo */}
          <Link
            to='/'
            aria-label='quickMed Logo'
            className='flex items-center'
            onClick={handleRoute}>
            <img
              src={`${import.meta.env.BASE_URL}/images/logo.png`}
              alt='logo'
              className='w-[120px] h-auto'
            />
          </Link>

          <DesktopNav />

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={handleToggleMenu}
            className='lg:hidden inline-flex items-center justify-center p-2 rounded-md text-[#014e78] hover:text-white hover:bg-[#014e78]'>
            <MenuIcon />
          </button>

          <MobileMenu />

          {/* Mobile Phone Call Icon */}
          <a
            target='_self'
            href='https://wa.me/923488597922'
            aria-label='Sadeeq Helpline'
            className='lg:hidden absolute right-16 top-1/2 -translate-y-1/2 text-[#014e78] hover:text-[#004d71]'></a>
        </div>
      </div>
    </header>
  );
};

export default Header;
