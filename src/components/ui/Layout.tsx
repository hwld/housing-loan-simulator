import { ReactNode } from "react";
import { Page, SideMenu } from "./sidemenu/SideMenu";

type Props = { children: ReactNode; currentPage: Page };
export const Layout: React.FC<Props> = ({ children, currentPage }) => {
  return (
    <div className="min-h-screen flex">
      <div className="min-w-[350px] shrink-0">
        <SideMenu currentPage={currentPage} />
      </div>
      <main className="flex-grow flex h-screen px-6 pb-6 pt-16 space-x-5">
        {children}
      </main>
    </div>
  );
};
