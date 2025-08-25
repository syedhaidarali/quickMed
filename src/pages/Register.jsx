/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context";
import { InputField } from "../components/formItems";
import { formatCNIC } from "../helpers";
import { userFormSchema } from "../schemas";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const { signUpFun, loading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      cnic: "",
      password: "",
    },
  });

  const handleCnicChange = (e) => {
    setValue("cnic", formatCNIC(e.target.value));
  };

  const onSubmit = async (data) => {
    try {
      await signUpFun(data, navigate);
    } catch (error) {
      toast.error(error.response.data.data);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='md:min-w-md w-full bg-white p-8 rounded-xl shadow-md'>
        <h2 className='mb-6 text-center text-3xl font-extrabold text-emerald-900'>
          Create your account
        </h2>
        <form
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label='Name'
            type='text'
            {...register("name")}
            error={errors.name?.message}
            required
          />
          <InputField
            label='Email address'
            type='email'
            {...register("email")}
            error={errors.email?.message}
            required
          />
          <InputField
            label='CNIC'
            {...register("cnic")}
            error={errors.cnic?.message}
            onChange={handleCnicChange}
            required
            placeholder='xxxxx-xxxxxxx-x'
            maxLength={15}
          />
          <InputField
            label='Password'
            type='password'
            {...register("password")}
            error={errors.password?.message}
            required
          />
          <div>
            <button
              type='submit'
              disabled={loading}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'>
              {loading ? "Creating Account..." : "Register"}
            </button>
          </div>
        </form>
        <div className='mt-6 text-center'>
          <span className='text-sm text-emerald-700'>
            Already have an account?
          </span>
          <Link
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            to='/login'
            className='ml-1 text-emerald-600 hover:underline font-medium'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
