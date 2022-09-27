import type { NextPage } from "next";
import { SideMenu } from "../src/components/SideMenu";
import { Simulator } from "../src/components/Simulator";

const Home: NextPage = () => {
  return (
    <div className="h-screen flex">
      <div className="w-96 shrink-0">
        <SideMenu />
      </div>
      <main className="flex-grow flex justify-center items-center bg-red-00">
        <Simulator />
      </main>
    </div>
  );
};

export default Home;
