"use client";
import { useState } from "react";

export default function Login() {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <div className="w-full h-[100vh] flex  items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-7 min-w-[600px] min-h-[700px] py-7 px-5">
        <h3 className="text-xl font-semibold">ADMIN LOGIN</h3>

        <form className="flex flex-col gap-2 border px-12 py-12 w-full rounded">
          <label htmlFor="email" className="text-black">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            required
            type="email"
            placeholder="Enter your email address"
            id="email"
            className="border-b bg-transparent  py-1 px-1"
          />

          <label htmlFor="password" className="mt-2">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="w-full relative">
            <input
              required
              placeholder="Enter password"
              type={showPass ? "text" : "password"}
              id="password"
              className="border-b bg-transparent py-1 px-1 w-full pr-[13%]"
            />
            <div
              onClick={() => setShowPass((prev) => !prev)}
              className="w-max h-max absolute right-2 top-[20%] text-sm cursor-pointer"
            >
              {showPass ? "hide" : "show"}
            </div>
          </div>

          <button className="border mt-4 bg-blue-600 rounded-lg py-2 border-transparent font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
