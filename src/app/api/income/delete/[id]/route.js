import { connectDb } from "../../../../../../backend/db/db";
import { NextResponse } from "next/server";
import { incomeModel } from "../../../../../../backend/model/income";
import { validToken } from "../../../../../../backend/helper";

export let DELETE = async (request, { params }) => {
  try {
    await connectDb();

    let { id: loggedInUserId } = await validToken();

    let incomeData = await incomeModel.findById(params.id);
    if (!incomeData) {
      return NextResponse.json({
        error: true,
        msg: "Income not found",
      });
    }

    if (incomeData.userId.toString() !== loggedInUserId) {
      return NextResponse.json({
        error: true,
        msg: "Unauthorized access",
      });
    }

    await incomeData.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      msg: "Income deleted successfully",
    });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
