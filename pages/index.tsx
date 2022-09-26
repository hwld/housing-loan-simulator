import type { NextPage } from "next";
import { SideMenu } from "../src/components/SideMenu";
import { Simulator } from "../src/components/Simulator";

const Home: NextPage = () => {
  return (
    <div className="h-screen flex">
      <div className="w-80">
        <SideMenu />
      </div>
      <main className="flex-grow flex justify-center items-center">
        <Simulator />
      </main>
    </div>
  );
};

export default Home;
