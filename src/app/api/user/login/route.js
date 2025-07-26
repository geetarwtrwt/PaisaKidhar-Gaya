import { connectDb } from "../../../../../backend/db/db";
import { NextResponse } from "next/server";
import { userModel } from "../../../../../backend/model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export let POST = async (request) => {
  try {
    await connectDb();
    let { email, password } = await request.json();

    if ((!email, !password)) {
      return NextResponse.json({
        error: true,
        msg: "All fields are required",
      });
    }

    let userExists = await userModel.findOne({ email });
    if (!userExists || (await bcrypt.compare(password, userExists.password))) {
      return NextResponse.json({ error: true, msg: "Invalid credentials" });
    }

    let key = "geeta11";
    let token = jwt.sign({ id: userExists._id }, key, { expiresIn: "1d" });

    let cookieStore = await cookies();
    cookieStore.set("token", token, { httpOnly: true, maxAge: 86400 });

    return NextResponse.json({
      success: true,
      msg: "Logged in successfully",
      token: token,
    });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
