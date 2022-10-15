import * as Accordion from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChangeEventHandler,
  FormEventHandler,
  ReactNode,
  useState,
} from "react";
import { FaChevronDown } from "react-icons/fa";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";

type Props = {
  title: string;
  inputs: ReactNode;
  result: ReactNode;
  remarks: string;
  onChangeRemarks: ChangeEventHandler<HTMLTextAreaElement>;
  onSimulate: FormEventHandler<HTMLFormElement>;
};
export const SimulatorLayout: React.FC<Props> = ({
  title,
  inputs,
  result,
  remarks,
  onChangeRemarks,
  onSimulate,
}) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSimulate(e);
  };

  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    undefined
  );

  return (
    <div className="flex flex-col w-[800px] bg-gray-100 rounded-lg space-y-6 shadow-xl">
      <div className="bg-red-700 rounded-t-lg px-4 py-6">
        <h3 className="text-2xl text-gray-100 font-bold select-none">
          {title}
        </h3>
      </div>
      <div className="px-4 space-y-6">
        <div className="flex-grow grid grid-cols-2 gap-3">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1">{inputs}</div>
            <Button>計算する</Button>
          </form>
          {result}
        </div>
      </div>
      <div>
        <Accordion.Root
          type="single"
          collapsible
          value={accordionValue}
          onValueChange={(e) => setAccordionValue(e)}
        >
          <Accordion.Item value="remarks">
            <Accordion.Header className="bg-gray-200 hover:bg-gray-300 rounded-b-lg data-state-open:rounded-none transition-all">
              <Accordion.Trigger className="px-4 py-3 flex justify-between items-center space-x-3 cursor-pointer w-full">
                <div>備考欄</div>
                <FaChevronDown />
              </Accordion.Trigger>
            </Accordion.Header>
            <AnimatePresence>
              {accordionValue === "remarks" && (
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
                    <Textarea
                      rows={6}
                      value={remarks}
                      onChange={onChangeRemarks}
                    />
                  </Accordion.Content>
                </motion.div>
              )}
            </AnimatePresence>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    </div>
  );
};
