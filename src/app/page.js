"use client";
// import Image from "next/image";
import React from "react";
import Image from "next/image";
import SideBar from "@/app/components/SideBar";
import { userContext } from "@/app/UseAuth";
import { FaBars } from "react-icons/fa6";

export default function Home() {
  let { user } = userContext();

  return (
    <>
      <div className="h-screen">
        <header className="border-b-2 border-borderLight py-4 text-primary">
          <div className="containerBox text-2xl font-bold">
            PaisaKidhar Gaya?
          </div>
        </header>
      </div>
    </>
  );
}
