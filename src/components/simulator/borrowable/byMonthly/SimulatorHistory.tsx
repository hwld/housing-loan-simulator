import {
  BorrowableByMonthlyFormData,
  BorrowableByMonthlyResult,
} from "../../../../models/simulator/borrowable/monthlyRepayment";
import { SimulationHistoryItem } from "../../history/SimulationHistoryItem";
import { SimulationHistoryLayout } from "../../history/SimulationHistoryLayout";

type Props = {
  history: (BorrowableByMonthlyFormData & BorrowableByMonthlyResult)[];
};
export const SimulatorHistory: React.FC<Props> = ({ history }) => {
  return (
    <SimulationHistoryLayout>
      {history.map((h, i) => {
        const mainResult = {
          title: "借入可能額",
          value: `${Math.round(h.borrowableAmount).toLocaleString()}円`,
        };

        const inputs = [
          { title: "月々の支払額", value: `${h.monthlyRepayment}万円` },
          { title: "年利", value: `${h.annualInterest}%` },
          { title: "返済期間", value: `${h.yearsOfRepayment}年` },
        ];

        return (
          <SimulationHistoryItem
            key={i}
            mainResult={mainResult}
            inputs={inputs}
            remarks={""}
          />
        );
      })}
    </SimulationHistoryLayout>
  );
};
