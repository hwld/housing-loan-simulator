import {
  RepaymentFormData,
  RepaymentResult,
} from "../../../models/simulator/repayment";
import { ResultDoc } from "../resultDoc/ResultDoc";
import { ResultDocCard } from "../resultDoc/ResultDocCard";
import { ResultDocInputCard } from "../resultDoc/ResultDocInputCard";

type Props = { result: RepaymentResult & RepaymentFormData; id: string };

const formatMoney = (value: number) => {
  return Math.round(value).toLocaleString();
};

export const RepaymentResultDoc: React.FC<Props> = ({
  result: {
    monthlyRepaymentAmount,
    totalRepaymentAmount,
    totalInterest,
    borrowableAmount,
    annualInterest,
    yearsOfRepayment,
  },
  id,
}) => {
  return (
    <ResultDoc
      id={id}
      results={
        <>
          <ResultDocCard
            title="月々の返済額"
            value={`${formatMoney(monthlyRepaymentAmount)}円`}
            size="lg"
          />
          <ResultDocCard
            title="支払総額"
            value={`${formatMoney(totalRepaymentAmount)}円`}
          />
          <ResultDocCard
            title="利子総額"
            value={`${formatMoney(totalInterest)}円`}
          />
        </>
      }
      inputs={
        <>
          <ResultDocInputCard
            title="借入額"
            value={`${borrowableAmount}万円`}
          />
          <ResultDocInputCard title="年利" value={`${annualInterest}%`} />
          <ResultDocInputCard
            title="借入期間"
            value={`${yearsOfRepayment}年`}
          />
        </>
      }
    />
  );
};
