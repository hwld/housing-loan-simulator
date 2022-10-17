import {
  BorrowableByIncomeFormData,
  BorrowableByIncomeResult,
} from "../../../../models/simulator/borrowable/income";
import { SimulationHistoryItem } from "../../history/SimulationHistoryItem";
import { SimulationHistoryLayout } from "../../history/SimulationHistoryLayout";

type Props = {
  history: (BorrowableByIncomeFormData & BorrowableByIncomeResult)[];
  onRemoveHistory: (i: number) => void;
};
export const SimulatorHistory: React.FC<Props> = ({
  history,
  onRemoveHistory,
}) => {
  return (
    <SimulationHistoryLayout>
      {history.map((h, i) => {
        const mainResult = {
          title: "借入可能額",
          value: `${Math.round(h.borrowableAmount).toLocaleString()}円`,
        };

        const inputs = [
          { title: "年収", value: `${h.annualIncome}万円` },
          { title: "年利", value: `${h.annualInterest}%` },
          { title: "返済期間", value: `${h.yearsOfRepayment}年` },
        ];

        return (
          <SimulationHistoryItem
            key={i}
            onRemove={() => onRemoveHistory(i)}
            mainResult={mainResult}
            inputs={inputs}
            remarks={""}
          />
        );
      })}
    </SimulationHistoryLayout>
  );
};
