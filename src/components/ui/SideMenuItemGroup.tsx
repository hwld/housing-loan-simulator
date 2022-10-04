import {
  AnimationEventHandler,
  ReactNode,
  SyntheticEvent,
  useState,
} from "react";
import { FaCalculator } from "react-icons/fa";
import { SideMenuItemGroupHeader } from "./SideMenuItemGroupHeader";

type Props = { children: ReactNode };

export const SideMenuItemGroup: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [shownItems, setshownItems] = useState(isOpen);

  // 一度でも開閉したか
  const [toggled, setToggled] = useState(false);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setToggled(true);

    setIsOpen((s) => !s);
    // 開かれたときにのみこれをセットする
    if (isOpen === false) {
      setshownItems(true);
    }
  };

  const handleAnimationEnd: AnimationEventHandler<HTMLDivElement> = (e) => {
    // 閉じるアニメーション終わりにアイテムを非表示にする。
    if (isOpen === false) {
      setshownItems(false);
    }
  };

  return (
    <div>
      <SideMenuItemGroupHeader
        isOpen={isOpen}
        headIcon={FaCalculator}
        onClick={handleClick}
      >
        借入可能額
      </SideMenuItemGroupHeader>
      {shownItems && (
        <div
          className={
            toggled ? (isOpen ? "animate-slideDown" : "animate-slideUp") : ""
          }
          style={{ animationFillMode: "forwards" }}
          onAnimationEnd={handleAnimationEnd}
        >
          <div className="ml-5 mt-2 space-y-1">{children}</div>
        </div>
      )}
    </div>
  );
};
