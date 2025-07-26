import mongoose, { Schema, model, models } from "mongoose";

let incomeSchema = new Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
    icon: { type: String },
    source: { type: String, required: true }, //ex:salary,income sources
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export let incomeModel = models.income || model("income", incomeSchema);
