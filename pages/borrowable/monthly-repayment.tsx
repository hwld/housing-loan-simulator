import { Simulator } from "../../src/components/simulator/borrowable/byMonthly/Simulator";
import { SimulatorHistory } from "../../src/components/simulator/borrowable/byMonthly/SimulatorHistory";
import { useSimulator } from "../../src/components/simulator/useSimulator";
import { Layout } from "../../src/components/ui/Layout";
import {
  borrowableByMonthlySchema,
  simulateBorrowableByMonthly,
} from "../../src/models/simulator/borrowable/monthlyRepayment";
import { NextPageWithLayout } from "../_app";

//
const MonthlyRepayment: NextPageWithLayout = () => {
  const { simulator, simulationHistory, removeHistory, removeAllHistories } =
    useSimulator({
      key: "monthly-repayment",
      innerSimulate: simulateBorrowableByMonthly,
      formDataSchema: borrowableByMonthlySchema,
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

MonthlyRepayment.getLayout = (page) => {
  return <Layout currentPage="/borrowable/monthly-repayment">{page}</Layout>;
};

export default MonthlyRepayment;
