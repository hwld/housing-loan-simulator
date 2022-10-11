import { ReactNode } from "react";
import { Page, SideMenu } from "./sidemenu/SideMenu";

type Props = { children: ReactNode; currentPage: Page };
export const Layout: React.FC<Props> = ({ children, currentPage }) => {
  return (
    <div className="h-screen flex">
      <div className="min-w-[350px] shrink-0">
        <SideMenu currentPage={currentPage} />
      </div>
      <main className="flex-grow flex justify-center h-fit p-6 mt-16">
        {children}
      </main>
    </div>
  );
};
