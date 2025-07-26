"use client";
import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash, FaRegUser, FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import Link from "next/link";
import { userContext } from "@/app/UseAuth";
// import axios from "axios";
// import { toast } from "react-toastify";

export default function Page() {
  let { axios, toast } = userContext();
  let [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  let inputRef = useRef(null);
  let [userImg, setUserImg] = useState(null);
  let [imgPreview, setImgPreview] = useState(null);
  let [showPassword, setShowPassword] = useState(false);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  let handleImgChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setUserImg(file);
      let preview = URL.createObjectURL(file);
      setImgPreview(preview);
    }
  };

  let handleRemoveImg = () => {
    setUserImg(null);
    setImgPreview(null);
  };

  let chooseFile = () => {
    inputRef.current.click();
  };

  let handleForm = async (e) => {
    e.preventDefault();
    try {
      if (!userImg) {
        toast.error("Please select a profile image");
        return;
      }

      let formData = new FormData();

      formData.append("img", userImg);
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("password", input.password);

      let res = await axios.post("/api/user/signup", formData);
      console.log(res);
      if (res.data.success) {
        setInput({
          name: "",
          email: "",
          password: "",
        });
        setUserImg(null);
        setImgPreview(null);
        toast.success("User registered successfully");
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error("User already exists");
      } else {
        console.log(err);
        toast.error(err.message);
      }
    }
  };
  return (
    <>
      <section className="h-screen">
        <div className="containerBox flex items-center justify-center gap-10 h-full">
          <div className="w-[60%] space-y-10">
            <h1 className="text-primary text-4xl font-bold">Register Now</h1>
            <h4 className="text-xl">
              Access your dashboard, manage your stuff, and get back to business
              like a boss.
            </h4>
            <form onSubmit={handleForm}>
              <div className="flex flex-col items-center justify-center">
                <p>Profile Picture</p>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  accept="image/*"
                  ref={inputRef}
                  hidden
                  onChange={(e) => handleImgChange(e)}
                />
                {!userImg ? (
                  <div className="text-5xl flex flex-col items-center">
                    <FaRegUser className="bg-secondary text-primary pt-3 pb-0 rounded-full w-25 h-25 " />

                    <FiUpload
                      onClick={() => chooseFile()}
                      className="cursor-pointer text-3xl translate-x-6 -translate-y-6 bg-primary rounded-full p-1 text-bgColor"
                    />
                  </div>
                ) : (
                  <div className="text-5xl flex flex-col items-center">
                    <img
                      src={imgPreview}
                      className="border-2 border-primary rounded-full w-25 h-25 object-cover"
                    />

                    <MdDelete
                      className="cursor-pointer text-3xl translate-x-6 -translate-y-6 bg-primary rounded-full p-1 text-bgColor"
                      onClick={() => handleRemoveImg()}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between gap-4">
                <div className="w-1/2">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={input.name}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter name"
                    className="w-full border rounded p-1.5"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={input.email}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter email"
                    className="w-full border rounded p-1.5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <div className="flex items-center relative">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    id="password"
                    name="password"
                    required
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
                <button
                  type="submit"
                  className="w-full p-1.5 rounded text-bgColor font-bold"
                >
                  Sign up
                </button>
              </div>
              <p>
                Already an account?
                <Link href="/login" className="text-primary">
                  Login now
                </Link>
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
