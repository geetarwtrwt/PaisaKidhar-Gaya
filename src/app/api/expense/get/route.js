import { connectDb } from "../../../../../backend/db/db";
import { NextResponse } from "next/server";
import { expenseModel } from "../../../../../backend/model/expense";
import { validToken } from "../../../../../backend/helper";

export let GET = async (request) => {
  try {
    await connectDb();
    let { id } = await validToken();

    let data = await expenseModel.find(id).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, msg: data });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
