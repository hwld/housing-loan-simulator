import { NextPage } from "next";
import { RepaymentSimulator } from "../src/components/simulator/repayment/RepaymentSimulator";
import { Layout } from "../src/components/ui/Layout";

const Repayment: NextPage = () => {
  return (
    <Layout currentPage="/repayment">
      <RepaymentSimulator />
    </Layout>
  );
};

export default Repayment;
