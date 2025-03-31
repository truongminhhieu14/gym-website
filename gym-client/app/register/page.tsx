"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import SummaryApi from "@/services/SummaryApi";
import { useRouter } from "next/navigation";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.register.url, {
        method: SummaryApi.register.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();
      console.log("API Response:", dataApi);
      if (dataApi.success) {
        toast.success(dataApi.message);
        router.push("/login");
      } else {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };
  return (
    <section className="bg-slate-100" id="register">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div>
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
              <img src="/assets/assets/img/signin.gif" alt="login icons"/>

            </div>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="grid">
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="grid">
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl ml-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="bg-slate-950 hover:bg-slate-800 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
            >
              Register
            </button>
          </form>

          {/* Link to Sign In */}
          <p className="my-5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
