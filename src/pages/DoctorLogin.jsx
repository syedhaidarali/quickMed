/** @format */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useDoctor } from "../context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../components/formItems";
import { doctorLoginSchema } from "../schemas";
import { Modal } from "../modals";

const DoctorLogin = () => {
  const [activeTab, setActiveTab] = useState("email");
  const { DoctorLogin, loading } = useDoctor();
  const [modalOpen, setModalOpen] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(doctorLoginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const msg = await DoctorLogin(
      {
        identifier: data.identifier,
        password: data.password,
      },
      navigate
    );
    if (msg) {
      console.log(msg);
      setModalOpen(true);
      setLoginMessage(msg);
    }
    reset();
  };
  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='md:min-w-md w-full bg-white p-8 rounded-xl shadow-md'>
        <h2 className='mb-6 text-center text-3xl font-extrabold text-emerald-900'>
          Login as a Doctor
        </h2>

        {/* Tabs */}
        <div className='mb-6'>
          <div className='flex bg-gray-100 rounded-lg p-1'>
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === "email"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              Email Login
            </button>
            <button
              onClick={() => setActiveTab("pmdc")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === "pmdc"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              PMDC Login
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label={activeTab === "email" ? "Email Address" : "PMDC Number"}
            type='text'
            name='identifier'
            {...register("identifier")}
            error={errors.identifier?.message}
            placeholder={
              activeTab === "email" ? "Enter email" : "Enter PMDC number"
            }
            autoComplete='username'
          />
          <InputField
            label='Password'
            type='password'
            name='password'
            {...register("password")}
            error={errors.password?.message}
            placeholder='Enter your password'
            autoComplete='current-password'
          />
          <button
            type='submit'
            disabled={loading}
            className='w-full py-2 px-4 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition duration-200 disabled:opacity-50'>
            {loading
              ? "Signing In..."
              : `Sign In with ${activeTab === "email" ? "Email" : "PMDC"}`}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <span className='text-sm text-emerald-700'>
            Don't have an account?
          </span>
          <Link
            to='/register/doctor'
            className='ml-1 text-emerald-600 hover:underline font-medium'
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Register
          </Link>
        </div>
        <div className='text-center'>
          <Link
            className='ml-1 text-emerald-600 hover:underline font-medium'
            to='/forgot-password?type=doctor'>
            Forgot Password
          </Link>
        </div>
      </div>
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title='Login Status'
        description={loginMessage}>
        <button
          className='mt-4 w-full rounded-lg bg-emerald-600 px-6 py-2 text-white font-semibold shadow-md hover:bg-emerald-700 transition duration-300 ease-in-out active:scale-95'
          onClick={() => navigate("/doctor/upload-documents")}>
          Upload Documents
        </button>
      </Modal>
    </div>
  );
};

export default DoctorLogin;
