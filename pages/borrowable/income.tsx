import { Simulator } from "../../src/components/simulator/borrowable/byIncome/Simulator";
import { SimulatorHistory } from "../../src/components/simulator/borrowable/byIncome/SimulatorHistory";
import { useSimulator } from "../../src/components/simulator/useSimulator";
import { Layout } from "../../src/components/ui/Layout";
import {
  borrowableByIncomeSchema,
  simulateBorrowableByIncome,
} from "../../src/models/simulator/borrowable/income";
import { NextPageWithLayout } from "../_app";

const Income: NextPageWithLayout = () => {
  const { simulator, simulationHistory, removeHistory, removeAllHistories } =
    useSimulator(simulateBorrowableByIncome, borrowableByIncomeSchema);

  return (
    <>
      <Simulator simulator={simulator} />
      <SimulatorHistory
        history={simulationHistory}
        onRemoveHistory={removeHistory}
        onRemoveAllHistories={removeAllHistories}
      />
    </>
  );
};

Income.getLayout = (page) => {
  return <Layout currentPage="/borrowable/income">{page}</Layout>;
};

export default Income;
