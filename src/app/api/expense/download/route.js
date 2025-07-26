import { connectDb } from "../../../../../backend/db/db";
import { NextResponse } from "next/server";
import { expenseModel } from "../../../../../backend/model/expense";
import { validToken } from "../../../../../backend/helper";
const ExcelJS = require("exceljs");

export let GET = async (request) => {
  try {
    await connectDb();
    let { id } = await validToken();

    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Expense data");

    let expense = await expenseModel.find(id).sort({ createdAt: -1 });

    worksheet.columns = [
      { header: Icon, key: Icons, width: 30 },
      { header: Category, key: category, width: 30 },
      { header: Amount, key: amount, width: 30 },
      { header: Date, key: date, width: 30 },
    ];

    expense.forEach((e) => {
      worksheet.addRow({
        icon: e.icon,
        category: e.category,
        amount: e.amount,
        date: e.date,
      });
    });

    let buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreedsheetml.sheet",
        "Content-Disposition": `attachment;filename="expense_data.xlsx"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
