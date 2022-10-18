import {
  BorrowableByIncomeFormData,
  BorrowableByIncomeResult,
} from "../../../../models/simulator/borrowable/income";
import { SimulationHistoryItem } from "../../history/SimulationHistoryItem";
import { SimulationHistoryLayout } from "../../history/SimulationHistoryLayout";

type Props = {
  history: (BorrowableByIncomeFormData &
    BorrowableByIncomeResult & { id: string; remarks: string })[];
  onRemoveHistory: (i: number) => void;
  onRemoveAllHistories: () => void;
};
export const SimulatorHistory: React.FC<Props> = ({
  history,
  onRemoveHistory,
  onRemoveAllHistories,
}) => {
  return (
    <SimulationHistoryLayout
      onRemoveAll={onRemoveAllHistories}
      disabledRemove={history.length === 0}
    >
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
            key={h.id}
            onRemove={() => onRemoveHistory(i)}
            mainResult={mainResult}
            inputs={inputs}
            remarks={h.remarks}
          />
        );
      })}
    </SimulationHistoryLayout>
  );
};
