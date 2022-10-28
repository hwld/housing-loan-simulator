import { SimulatorHistory } from "../src/components/simulator/repayment/SimulationHistory";
import { Simulator } from "../src/components/simulator/repayment/Simulator";
import { useSimulator } from "../src/components/simulator/useSimulator";
import { Layout } from "../src/components/ui/Layout";
import {
  repaymentSchema,
  simulateRepayment,
} from "../src/models/simulator/repayment";
import { NextPageWithLayout } from "./_app";

const Repayment: NextPageWithLayout = () => {
  const { simulator, simulationHistory, removeHistory, removeAllHistories } =
    useSimulator({
      key: "repayment",
      innerSimulate: simulateRepayment,
      formDataSchema: repaymentSchema,
    });

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

Repayment.getLayout = (page) => {
  return <Layout currentPage="/repayment">{page}</Layout>;
};

export default Repayment;
