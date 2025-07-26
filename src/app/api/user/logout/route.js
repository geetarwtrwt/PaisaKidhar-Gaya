import { connectDb } from "../../../../../backend/db/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export let POST = async (request) => {
  try {
    await connectDb();
    cookies().set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return NextResponse.json({ success: true, msg: "Logout successfully" });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
