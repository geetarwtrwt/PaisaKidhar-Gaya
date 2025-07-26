import { Schema, models, model } from "mongoose";

let expenseSchema = new Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
    icon: { type: String },
    category: { type: String, required: true },
    amount: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export let expenseModel = models.expense || model("expense", expenseSchema);
