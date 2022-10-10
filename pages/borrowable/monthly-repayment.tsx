import { NextPage } from "next";
import { BorrowableSimulatorByMonthy } from "../../src/components/simulator/borrowable/byMonthly/BorrowableSimulatorByMonthly";
import { Layout } from "../../src/components/ui/Layout";

//
const MonthlyRepayment: NextPage = () => {
  return (
    <Layout currentPage="/borrowable/monthly-repayment">
      <BorrowableSimulatorByMonthy />
    </Layout>
  );
};

export default MonthlyRepayment;
