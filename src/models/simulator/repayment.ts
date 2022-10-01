//　実際にユーザーが入力するデータ
export type RepaymentFormData = {
  borrowableAmount: string;
  annualInterest: string;
  yearsOfRepayment: string;
};

// システムに入力するデータ
export type RepaymentInputs = {
  [T in keyof RepaymentFormData]: number;
};

// シミュレーション結果
export type RepaymentResult = {
  monthlyRepaymentAmount: number;
  totalRepaymentAmount: number;
  totalInterest: number;
};

export const RepaymentInputs = (
  formData: RepaymentFormData
): RepaymentInputs | undefined => {
  if (Object.values(formData).some((d) => Number.isNaN(Number(d)))) {
    return undefined;
  }

  return {
    // 万単位で入力されているのを円に変換する。
    borrowableAmount: Number(formData.borrowableAmount) * 10000,
    // %単位で入力されているので、少数に変換する。
    annualInterest: Number(formData.annualInterest) / 100,
    yearsOfRepayment: Number(formData.yearsOfRepayment),
  };
};

export const simulateRepayment = (inputs: RepaymentInputs): RepaymentResult => {
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
