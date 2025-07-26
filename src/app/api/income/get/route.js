import { connectDb } from "../../../../../backend/db/db";
import { NextResponse } from "next/server";
import { incomeModel } from "../../../../../backend/model/income";
import { validToken } from "../../../../../backend/helper";
export let POST = async (request) => {
  try {
    await connectDb();
    let { id } = await validToken();
    let data = await incomeModel.find(id).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, msg: data });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
