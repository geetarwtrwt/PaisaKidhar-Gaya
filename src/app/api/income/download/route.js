import { connectDb } from "../../../../../backend/db/db";
import { NextResponse } from "next/server";
import { incomeModel } from "../../../../../backend/model/income";
import { validToken } from "../../../../../backend/helper";
import ExcelJS from "exceljs";
// import xlsx from "xlsx";

export let GET = async (request) => {
  try {
    await connectDb();

    let { id } = await validToken();

    let incomes = await incomeModel.find(id).sort({ date: -1 });

    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet("Income data");

    worksheet.columns = [
      {
        header: "Icon",
        key: "icon",
        width: 30,
      },
      {
        header: "Source",
        key: "source",
        width: 30,
      },
      {
        header: "Amount",
        key: "amount",
        width: 15,
      },
      {
        header: "Date",
        key: "date",
        width: 25,
      },
      {
        header: "Created At",
        key: "createdAt",
        width: 25,
      },
    ];

    incomes.forEach((e) => {
      worksheet.addRow({
        icon: e.icon,
        source: e.source,
        amount: e.amount,
        date: e.date,
      });
    });

    let buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment;filename="income_data.xlsx"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
