"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

let AuthContext = createContext();

export let ProvideContext = ({ children }) => {
  let route = useRouter();
  let pathName = usePathname();

  let [user, setUser] = useState([]);

  let fetchUserData = async () => {
    try {
      let data = await axios.get("/api/user/userinfo");
      setUser(data.data.msg);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <AuthContext.Provider
      value={{ route, pathName, axios, toast, fetchUserData, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export let userContext = () => {
  return useContext(AuthContext);
};
