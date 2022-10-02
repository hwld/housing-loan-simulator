import { simulateRepayment } from "../repayment";

export type BorrowableByIncomeFormData = {
  annualIncome: string;
  annualInterest: string;
  yearsOfRepayment: string;
};

export type BorrowableByIncomeInputs = {
  [T in keyof BorrowableByIncomeFormData]: number;
};

export type BorrowableByIncomeResult = {
  borrowableAmount: number;
};

export const borrowableByIncomeInputs = (
  formData: BorrowableByIncomeFormData
): BorrowableByIncomeInputs | undefined => {
  if (Object.values(formData).some((d) => Number.isNaN(Number(d)))) {
    return undefined;
  }

  return {
    annualIncome: Number(formData.annualIncome) * 10000,
    annualInterest: Number(formData.annualInterest) / 100,
    yearsOfRepayment: Number(formData.yearsOfRepayment),
  };
};

export const simulateBorrowableByIncome = (
  inputs: BorrowableByIncomeInputs
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
