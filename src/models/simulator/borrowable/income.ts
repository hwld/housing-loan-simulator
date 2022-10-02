import { z } from "zod";
import { annualInterestSchema, yearsOfRepaymentSchema } from "../common";
import { simulateRepayment } from "../repayment";

export const borrowableByIncomeSchema = z
  .object({
    annualIncome: z
      .number({ invalid_type_error: "半角数字を入力してください" })
      .int("整数を入力してください。")
      .min(1, { message: "1万円以上の金額を入力してください。" })
      .max(99999, { message: "5桁以下の金額を入力してください。" }),
    annualInterest: annualInterestSchema,
    yearsOfRepayment: yearsOfRepaymentSchema,
  })
  .transform((d) => {
    return {
      ...d,
      annualIncome: d.annualIncome * 10000,
      annualInterest: d.annualInterest / 100,
    };
  });

export type BorrowableByIncomeFormData = z.infer<
  typeof borrowableByIncomeSchema
>;

export type BorrowableByIncomeResult = {
  borrowableAmount: number;
};

export const simulateBorrowableByIncome = (
  inputs: BorrowableByIncomeFormData
): BorrowableByIncomeResult => {
  // 100万円を借りたときの毎月の支払額
  const monthlyRepaymentAmount = simulateRepayment({
    borrowableAmount: 1000000,
    annualInterest: inputs.annualInterest,
    yearsOfRepayment: inputs.yearsOfRepayment,
  }).monthlyRepaymentAmount;

  // 返済比率
  let repaymentRatio = 0.25;

  const result =
    ((inputs.annualIncome * repaymentRatio) / 12 / monthlyRepaymentAmount) *
    1000000;

  return { borrowableAmount: result };
};
