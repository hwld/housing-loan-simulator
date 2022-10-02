import { z } from "zod";
import { annualInterestSchema, yearsOfRepaymentSchema } from "../common";

//入力データのスキーマ
export const borrowableByMonthlySchema = z
  .object({
    monthlyRepayment: z
      .number({ invalid_type_error: "半角数字を入力してください。" })
      .int("整数を入力してください。")
      .min(1, { message: "1万円以上の金額を入力してください。" })
      .max(99999, { message: "5桁以下の金額を入力してください。" }),
    annualInterest: annualInterestSchema,
    yearsOfRepayment: yearsOfRepaymentSchema,
  })
  .transform((d) => {
    return {
      ...d,
      monthlyRepayment: d.monthlyRepayment * 10000,
      annualInterest: d.annualInterest / 100,
    };
  });

export type BorrowableByMonthlyFormData = z.infer<
  typeof borrowableByMonthlySchema
>;

export type BorrowableByMonthlyResult = {
  borrowableAmount: number;
};

export const simulateBorrowableByMonthly = (
  inputs: BorrowableByMonthlyFormData
): BorrowableByMonthlyResult => {
  const monthlyInterest = inputs.annualInterest / 12;
  const monthsOfRepayment = inputs.yearsOfRepayment * 12;
  const tmp = Math.pow(1 + monthlyInterest, monthsOfRepayment);
  const result =
    inputs.monthlyRepayment * ((tmp - 1) / (monthlyInterest * tmp));

  return { borrowableAmount: result };
};
