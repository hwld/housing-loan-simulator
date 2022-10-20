import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, SyntheticEvent, useState } from "react";
import { FaCalculator } from "react-icons/fa";
import { SideMenuItemGroupHeader } from "./SideMenuItemGroupHeader";

type Props = { children: ReactNode };

export const SideMenuItemGroup: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsOpen((s) => !s);
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

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="ml-5 mt-2 space-y-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
