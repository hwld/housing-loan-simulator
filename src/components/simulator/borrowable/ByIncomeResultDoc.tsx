import {
  BorrowableByIncomeFormData,
  BorrowableByIncomeResult,
} from "../../../models/simulator/borrowable/income";
import { ResultDoc } from "../resultDoc/ResultDoc";
import { ResultDocCard } from "../resultDoc/ResultDocCard";
import { ResultDocInputCard } from "../resultDoc/ResultDocInputCard";

type Props = {
  result: BorrowableByIncomeResult & BorrowableByIncomeFormData;
  id: string;
};

const formatMoney = (value: number) => {
  return Math.round(value).toLocaleString();
};

export const ByIncomeResultDoc: React.FC<Props> = ({
  result: { borrowableAmount, annualIncome, annualInterest, yearsOfRepayment },
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
          <ResultDocInputCard title="年収" value={`${annualIncome}万円`} />
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
