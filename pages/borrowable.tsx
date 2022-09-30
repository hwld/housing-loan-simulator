import { NextPage } from "next";
import { BorrowableSimulatorBasedIncome } from "../src/components/simulator/borrowable/BorrowableSimulatorBasedIncome";
import { Layout } from "../src/components/ui/Layout";

const Borrowable: NextPage = () => {
  return (
    <Layout currentPage="/borrowable">
      <BorrowableSimulatorBasedIncome />
    </Layout>
  );
};

export default Borrowable;
