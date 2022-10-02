import { z } from "zod";
import { annualInterestSchema, yearsOfRepaymentSchema } from "./common";

// 入力データのスキーマ
export const repaymentSchema = z
  .object({
    borrowableAmount: z
      .number({ invalid_type_error: "半角数字を入力してください。" })
      .int("整数を入力してください。")
      .min(100, { message: "100万円以上の金額を入力してください。" })
      .max(99999, { message: "5桁以下の金額を入力してください。" }),
    annualInterest: annualInterestSchema,
    yearsOfRepayment: yearsOfRepaymentSchema,
  })
  .transform((d) => {
    return {
      ...d,
      borrowableAmount: d.borrowableAmount * 10000,
      annualInterest: d.annualInterest / 100,
    };
  });

export type RepaymentFormData = z.infer<typeof repaymentSchema>;

// シミュレーション結果
export type RepaymentResult = {
  monthlyRepaymentAmount: number;
  totalRepaymentAmount: number;
  totalInterest: number;
};

export const simulateRepayment = (
  inputs: RepaymentFormData
): RepaymentResult => {
  const monthlyInterest = inputs.annualInterest / 12;
  const monthsOfRepayment = inputs.yearsOfRepayment * 12;
  const tmp = Math.pow(1 + monthlyInterest, monthsOfRepayment);

  const result = (inputs.borrowableAmount * monthlyInterest * tmp) / (tmp - 1);

  const totalRepaymentAmount = result * monthsOfRepayment;

  return {
    monthlyRepaymentAmount: result,
    totalRepaymentAmount,
    totalInterest: totalRepaymentAmount - inputs.borrowableAmount,
  };
};
