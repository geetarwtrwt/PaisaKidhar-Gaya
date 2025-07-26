import { connectDb } from "../../../../../backend/db/db";
import { NextResponse } from "next/server";
import { userModel } from "../../../../../backend/model/user";
import { validToken } from "../../../../../backend/helper";

export let GET = async () => {
  try {
    await connectDb();

    let { id } = await validToken();
    let data = await userModel.findById(id).select("-password");
    return NextResponse.json({ success: true, msg: data });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
