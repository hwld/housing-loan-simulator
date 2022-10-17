import { NextPage } from "next";
import { Simulator } from "../../src/components/simulator/borrowable/byIncome/Simulator";
import { SimulatorHistory } from "../../src/components/simulator/borrowable/byIncome/SimulatorHistory";
import { useSimulator } from "../../src/components/simulator/useSimulator";
import { Layout } from "../../src/components/ui/Layout";
import {
  borrowableByIncomeSchema,
  simulateBorrowableByIncome,
} from "../../src/models/simulator/borrowable/income";

const Income: NextPage = () => {
  const { simulator, simulationHistory, removeHistory, removeAllHistories } =
    useSimulator(simulateBorrowableByIncome, borrowableByIncomeSchema);

  return (
    <Layout currentPage="/borrowable/income">
      <Simulator simulator={simulator} />
      <SimulatorHistory
        history={simulationHistory}
        onRemoveHistory={removeHistory}
        onRemoveAllHistories={removeAllHistories}
      />
    </Layout>
  );
};

export default Income;
