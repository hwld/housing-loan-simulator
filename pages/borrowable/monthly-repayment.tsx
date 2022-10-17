import { NextPage } from "next";
import { Simulator } from "../../src/components/simulator/borrowable/byMonthly/Simulator";
import { SimulatorHistory } from "../../src/components/simulator/borrowable/byMonthly/SimulatorHistory";
import { useSimulator } from "../../src/components/simulator/useSimulator";
import { Layout } from "../../src/components/ui/Layout";
import {
  borrowableByMonthlySchema,
  simulateBorrowableByMonthly,
} from "../../src/models/simulator/borrowable/monthlyRepayment";

//
const MonthlyRepayment: NextPage = () => {
  const { simulator, simulationHistory, removeHistory } = useSimulator(
    simulateBorrowableByMonthly,
    borrowableByMonthlySchema
  );

  return (
    <Layout currentPage="/borrowable/monthly-repayment">
      <Simulator simulator={simulator} />
      <SimulatorHistory
        history={simulationHistory}
        onRemoveHistory={removeHistory}
      />
    </Layout>
  );
};

export default MonthlyRepayment;
