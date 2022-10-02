export type BorrowableByMonthlyFormData = {
  monthlyRepayment: string;
  annualInterest: string;
  yearsOfRepayment: string;
};

export type BorrowableByMonthlyInputs = {
  [T in keyof BorrowableByMonthlyFormData]: number;
};

export type BorrowableByMonthlyResult = {
  borrowableAmount: number;
};

export const borrowableByMonthlyInputs = (
  formData: BorrowableByMonthlyFormData
): BorrowableByMonthlyInputs | undefined => {
  if (Object.values(formData).some((d) => Number.isNaN(Number(d)))) {
    return undefined;
  }

  return {
    monthlyRepayment: Number(formData.monthlyRepayment) * 10000,
    annualInterest: Number(formData.annualInterest) / 100,
    yearsOfRepayment: Number(formData.yearsOfRepayment),
  };
};

export const simulateBorrowableByMonthly = (
  inputs: BorrowableByMonthlyInputs
): BorrowableByMonthlyResult => {
  const monthlyInterest = inputs.annualInterest / 12;
  const monthsOfRepayment = inputs.yearsOfRepayment * 12;
  const tmp = Math.pow(1 + monthlyInterest, monthsOfRepayment);
  const result =
    inputs.monthlyRepayment * ((tmp - 1) / (monthlyInterest * tmp));

  return { borrowableAmount: result };
};
