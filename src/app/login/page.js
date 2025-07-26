"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
// import axios from "axios";
// import { toast } from "react-toastify";
import { userContext } from "@/app/UseAuth";

export default function Page() {
  let { route, axios, toast, fetchUserData } = userContext();

  let [input, setInput] = useState({
    email: "",
    password: "",
  });

  let [showPassword, setShowPassword] = useState(false);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("/api/user/login", input, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data.msg);
      if (res.data.success) {
        toast.success(res.data.msg);
        fetchUserData();
        route.push("/");
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };
  return (
    <>
      <section className="h-screen">
        <div className="containerBox flex items-center justify-center gap-10 h-full">
          <div className="w-[60%] space-y-10">
            <h1 className="text-primary text-4xl font-bold">
              Login to Your Account
            </h1>
            <h4 className="text-xl">
              Access your dashboard, manage your stuff, and get back to business
              like a boss.
            </h4>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter email"
                  className="w-full border rounded p-1.5"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className="flex items-center relative">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    id="password"
                    name="password"
                    value={input.password}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter Password"
                    className="w-full border rounded p-1.5"
                  />

                  {showPassword ? (
                    <FaEyeSlash
                      className="absolute right-2 pl-2 border-l h-full text-3xl"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaEye
                      className="absolute right-2 pl-2 border-l h-full text-3xl"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>
              <div>
                <button className="w-full p-1.5 rounded text-bgColor font-bold">
                  Login
                </button>
              </div>
              <p>
                Don’t have an account?{" "}
                <Link href="/signup" className="text-primary">
                  Sign up now{" "}
                </Link>
                and start your journey with us.
              </p>
            </form>
          </div>
          <div className="w-[40%] relative h-1/2 flex items-center justify-center">
            <p className="text-primary text-4xl font-bold">
              Paisa Kidhar Gaya?
            </p>
            <div className="absolute -top-[20%] right-0 border-20 border-primary h-40 w-40 rounded-md"></div>
            <div className="absolute -bottom-[20%] left-0 bg-secondary h-40 w-40 rounded-md"></div>
          </div>
        </div>
      </section>
    </>
  );
}
