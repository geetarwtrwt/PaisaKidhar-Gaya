import { connectDb } from "../../../../backend/db/db";
import { NextResponse } from "next/server";
import { expenseModel } from "../../../../backend/model/expense";
import { incomeModel } from "../../../../backend/model/income";
import { validToken } from "../../../../backend/helper";

export let POST = async (request) => {
  try {
    await connectDb();
    let { id } = await validToken();

    // dates
    let now = new Date();
    let thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
    let sixtyDaysAgo = new Date(now - 60 * 24 * 60 * 60 * 1000);

    // all incomes and expense
    let allIncomes = await incomeModel.find(id);
    let allExpenses = await expenseModel.find(id);

    // total income and expense
    let totalIncome = allIncomes.reduce((acc, item) => acc + item.amount, 0);
    let totalExpense = allExpenses.reduce((acc, item) => acc + item.amount, 0);

    // last days 30 days expenses
    let last30DaysExpenses = allExpenses.filter(
      (e) => e.createdAt >= thirtyDaysAgo,
    );
    let total30DaysExpenses = last30DaysExpenses.reduce(
      (acc, item) => acc + item.amount,
      0,
    );

    // last days 60 days incomes
    let last60DaysIncome = allIncomes.filter((e) => {
      e.createdAt >= sixtyDaysAgo;
    });
    let total60DaysIncome = last60DaysIncome.reduce(
      (acc, item) => acc + item.amount,
      0,
    );

    // react 5 days transition
    let recentIncome = [...allIncomes]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);
    let recentExpense = [...allExpenses]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    let recentTransition = [...recentIncome, ...recentExpense]
      .sort((a, b) => {
        b.createdAt - a.createdAt;
      })
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      msg: {
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        last30DaysExpenses: {
          total: total30DaysExpenses,
          transition: last30DaysExpenses,
        },
        last60DaysIncome: {
          total: total60DaysIncome,
          transition: last60DaysIncome,
        },
        recentTransition: recentTransition,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: true, msg: err.message });
  }
};
