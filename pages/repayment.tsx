import { NextPage } from "next";
import { Layout } from "../src/components/Layout";
import { Simulator } from "../src/components/Simulator";

const Repayment: NextPage = () => {
  return (
    <Layout currentPage="/repayment">
      <Simulator />
    </Layout>
  );
};

export default Repayment;
