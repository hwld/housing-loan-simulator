import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useId, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { clsx } from "../../classnames";

type Props = { title: string; children: ReactNode };

export const SimulatorAccordion: React.FC<Props> = ({ title, children }) => {
  const itemValue = useId();
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  return (
    <Accordion.Root
      type="single"
      collapsible
      value={openItem}
      onValueChange={(e) => setOpenItem(e)}
    >
      <Accordion.Item value={itemValue}>
        <Accordion.Header className="bg-gray-200 hover:bg-gray-300 rounded-b-lg data-state-open:rounded-none transition-all">
          <Accordion.Trigger className="px-4 py-3 flex justify-between items-center space-x-3 cursor-pointer w-full">
            <div>{title}</div>
            <FaChevronDown
              className={clsx(
                "transition-all",
                openItem !== itemValue && "rotate-90"
              )}
            />
          </Accordion.Trigger>
        </Accordion.Header>
        <AnimatePresence>
          {openItem === itemValue && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { type: "spring", duration: 0.3 },
                  opacity: { duration: 0.4 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.2 },
                  opacity: { duration: 0.1 },
                },
              }}
            >
              <Accordion.Content className="px-4 py-3" forceMount>
                {children}
              </Accordion.Content>
            </motion.div>
          )}
        </AnimatePresence>
      </Accordion.Item>
    </Accordion.Root>
  );
};
