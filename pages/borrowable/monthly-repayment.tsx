import { NextPage } from "next";
import { Simulator } from "../../src/components/simulator/borrowable/byMonthly/Simulator";
import { Layout } from "../../src/components/ui/Layout";

//
const MonthlyRepayment: NextPage = () => {
  return (
    <Layout currentPage="/borrowable/monthly-repayment">
      <Simulator />
    </Layout>
  );
};

export default MonthlyRepayment;
