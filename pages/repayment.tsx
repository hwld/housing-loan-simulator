import { NextPage } from "next";
import { SimulatorHistory } from "../src/components/simulator/repayment/SimulationHistory";
import { Simulator } from "../src/components/simulator/repayment/Simulator";
import { useSimulator } from "../src/components/simulator/useSimulator";
import { Layout } from "../src/components/ui/Layout";
import {
  repaymentSchema,
  simulateRepayment,
} from "../src/models/simulator/repayment";

const Repayment: NextPage = () => {
  const { simulator, simulationHistory } = useSimulator(
    simulateRepayment,
    repaymentSchema
  );

  return (
    <Layout currentPage="/repayment">
      <Simulator simulator={simulator} />
      <SimulatorHistory history={simulationHistory} />
    </Layout>
  );
};

export default Repayment;
