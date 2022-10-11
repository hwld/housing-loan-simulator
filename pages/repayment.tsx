import { NextPage } from "next";
import { Simulator } from "../src/components/simulator/repayment/Simulator";
import { Layout } from "../src/components/ui/Layout";

const Repayment: NextPage = () => {
  return (
    <Layout currentPage="/repayment">
      <Simulator />
    </Layout>
  );
};

export default Repayment;
