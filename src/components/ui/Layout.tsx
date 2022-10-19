import { ReactNode } from "react";
import { Page, SideMenu } from "./sidemenu/SideMenu";

type Props = { children: ReactNode; currentPage: Page };
export const Layout: React.FC<Props> = ({ children, currentPage }) => {
  return (
    <div className="min-h-screen h-fit flex">
      <div className="min-w-[300px] shrink-0">
        <SideMenu currentPage={currentPage} />
      </div>
      <main className="grow flex justify-center h-screen px-6 pb-6 pt-16 space-x-5">
        {children}
      </main>
    </div>
  );
};
