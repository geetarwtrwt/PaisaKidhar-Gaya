import { connectDb } from "../../../../../../backend/db/db";
import { NextResponse } from "next/server";
import { expenseModel } from "../../../../../../backend/model/expense";
import { validToken } from "../../../../../../backend/helper";

export let DELETE = async (request, { params }) => {
  try {
    await connectDb();

    let { id: loggedInUser } = await validToken();

    let expenseData = await expenseModel.findById(params.id);

    if (!expenseData) {
      return NextResponse.json({ error: true, msg: "Expense not found" });
    }

    if (expenseData.userId.toString() !== loggedInUser) {
      return NextResponse.json({ error: true, msg: "Unauthorize access" });
    }

    await expenseData.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      msg: "Expense deleted successfully",
    });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
