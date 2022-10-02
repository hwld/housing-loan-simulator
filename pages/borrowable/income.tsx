import { NextPage } from "next";
import { BorrowableSimulatorByIncome } from "../../src/components/simulator/borrowable/BorrowableSimulatorByIncome";
import { Layout } from "../../src/components/ui/Layout";

const Income: NextPage = () => {
  return (
    <Layout currentPage="/borrowable/income">
      <BorrowableSimulatorByIncome />
    </Layout>
  );
};

export default Income;
