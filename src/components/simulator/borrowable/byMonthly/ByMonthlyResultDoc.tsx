import {
  BorrowableByMonthlyFormData,
  BorrowableByMonthlyResult,
} from "../../../../models/simulator/borrowable/monthlyRepayment";
import { ResultDoc } from "../../resultDoc/ResultDoc";
import { ResultDocCard } from "../../resultDoc/ResultDocCard";
import { ResultDocInputCard } from "../../resultDoc/ResultDocInputCard";

type Props = {
  result: BorrowableByMonthlyResult & BorrowableByMonthlyFormData;
  id: string;
};

const formatMoney = (value: number) => {
  return Math.round(value).toLocaleString();
};

export const ByMonthlyResultDoc: React.FC<Props> = ({
  result: {
    borrowableAmount,
    monthlyRepayment,
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
            title="借入可能額"
            value={`${formatMoney(borrowableAmount)}円`}
          />
        </>
      }
      inputs={
        <>
          <ResultDocInputCard
            title="月々の支払額"
            value={`${monthlyRepayment}万円`}
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
