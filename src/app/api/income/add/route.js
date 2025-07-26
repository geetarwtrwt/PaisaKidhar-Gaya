import { connectDb } from "../../../../../backend/db/db";
import { NextResponse } from "next/server";
import { incomeModel } from "../../../../../backend/model/income";
import { validToken } from "../../../../../backend/helper";

export let POST = async (request) => {
  try {
    await connectDb();

    let { id } = await validToken();
    let { source, amount, date } = await request.json();
    if (!source || !amount || !date) {
      return NextResponse.json({ error: true, msg: "All fields are required" });
    }

    let data = await incomeModel({
      userId: id,
      Icons,
      source,
      amount,
      date: new Date(date),
    });
    return NextResponse.json({ success: true, msg: data });
} catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
