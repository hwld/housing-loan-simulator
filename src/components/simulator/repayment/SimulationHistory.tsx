import {
  RepaymentFormData,
  RepaymentResult,
} from "../../../models/simulator/repayment";
import { SimulationHistoryItem } from "../history/SimulationHistoryItem";
import { SimulationHistoryLayout } from "../history/SimulationHistoryLayout";

type Props = {
  history: (RepaymentFormData & RepaymentResult)[];
};

export const SimulatorHistory: React.FC<Props> = ({ history }) => {
  return (
    <SimulationHistoryLayout>
      {history.map((h, i) => {
        const mainResult = {
          title: "月々の返済額",
          value: `${Math.round(h.monthlyRepaymentAmount).toLocaleString()}円`,
        };

        const subResults = [
          {
            title: "支払総額",
            value: `${h.totalRepaymentAmount.toLocaleString()}円`,
          },
          { title: "利子総額", value: `${h.totalInterest.toLocaleString()}円` },
        ];

        const inputs = [
          { title: "借入額", value: `${h.borrowableAmount}万円` },
          { title: "年利", value: `${h.annualInterest}%` },
          { title: "返済期間", value: `${h.yearsOfRepayment}年` },
        ];

        return (
          <SimulationHistoryItem
            key={i}
            mainResult={mainResult}
            subResults={subResults}
            inputs={inputs}
            remarks={""}
          />
        );
      })}
    </SimulationHistoryLayout>
  );
};
