import { NextPage } from "next";
import { Simulator } from "../../src/components/simulator/borrowable/byIncome/Simulator";
import { Layout } from "../../src/components/ui/Layout";

const Income: NextPage = () => {
  return (
    <Layout currentPage="/borrowable/income">
      <Simulator />
    </Layout>
  );
};

export default Income;
