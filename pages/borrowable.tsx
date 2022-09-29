import { NextPage } from "next";
import { Layout } from "../src/components/Layout";
import { Simulator } from "../src/components/Simulator";

const Borrowable: NextPage = () => {
  return (
    <Layout currentPage="/borrowable">
      <Simulator />
    </Layout>
  );
};

export default Borrowable;
