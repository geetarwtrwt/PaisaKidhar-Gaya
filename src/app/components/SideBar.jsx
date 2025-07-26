"use client";
import React, { useState } from "react";
import Image from "next/image";
import { userContext } from "@/app/UseAuth";
import Link from "next/link";
import { RiHandCoinFill } from "react-icons/ri";
import { FaWallet, FaUser } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";

export default function SideBar({ toggle }) {
  let { axios, route, pathName, user, setUser, toast } = userContext();

  let handleLogout = async () => {
    try {
      await axios.post("/api/user/logout");
      setUser(null);
      toast.success("User logout successfully");
      route.push("/");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <div
        className={`${toggle} h-full capitalize font-medium flex flex-col items-center pt-4 gap-8 text-black text-lg `}
      >
        <div>
          {
            <div className="flex flex-col items-center">
              {user.userImg ? (
                <Image
                  src={`/${user?.userImg}`}
                  width={80}
                  height={80}
                  alt="user img"
                  priority
                  className="w-[80px] h-[80px] rounded-full border-2 border-borderLight object-fill"
                />
              ) : (
                <FaUser className="w-[60px] h-[60px] rounded-full border-2 border-borderLight object-fill" />
              )}
              <h2>{user.name}</h2>
            </div>
          }
        </div>

        <div className="flex flex-col items-center gap-8 w-full ">
          <Link
            href="/"
            className={`flex items-center justify-center gap-4 py-2 rounded-md w-[80%] duration-300 
            ${
              pathName === "/" ? "bg-primary text-white" : "hover:bg-secondary"
            }`}
          >
            <TbLayoutDashboardFilled /> Dashboard
          </Link>
          <Link
            href="/income"
            className={`${
              pathName === "/income" ? "bg-primary text-white" : ""
            } flex items-center justify-center gap-4 py-2 rounded-md w-[80%]`}
          >
            <FaWallet /> Income
          </Link>
          <Link
            href="/expense"
            className={`${
              pathName === "/expense" ? "bg-primary text-white" : ""
            } flex items-center justify-center gap-4 py-2 rounded-md w-[80%]`}
          >
            <RiHandCoinFill /> Expense
          </Link>
          <button
            className={`cursor-pointer !bg-transparent flex items-center justify-center gap-4 py-2 rounded-md w-[80%]`}
          >
            <IoLogOut onClick={() => handleLogout()} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
