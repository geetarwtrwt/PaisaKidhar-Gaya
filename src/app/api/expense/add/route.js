import { connectDb } from "../../../../../backend/db/db";
import { NextResponse } from "next/server";
import { expenseModel } from "../../../../../backend/model/expense";
import { validToken } from "../../../../../backend/helper";

export let POST = async (request) => {
  try {
    await connectDb();
    let { id } = await validToken();

    let { icon, category, amount, date } = await request.json();

    if (!category || !amount) {
      return NextResponse.json({ error: true, msg: "All fields are required" });
    }

    let data = await expenseModel.create({
      userId: id,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    return NextResponse.json({ success: true, msg: data });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
