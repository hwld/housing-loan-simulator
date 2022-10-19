import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

type Item = { title: string; value: string };
type Props = {
  mainResult: Item;
  subResults?: Item[];
  inputs: Item[];
  remarks: string;
  onRemove: () => void;
};
export const SimulationHistoryItem: React.FC<Props> = ({
  mainResult,
  subResults = [],
  inputs,
  remarks,
  onRemove,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      <div className="relative p-4 bg-gray-100 rounded-lg shadow-md">
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 group flex justify-center items-center"
        >
          <div className="absolute group-hover:bg-red-500/20 h-8 w-8 transition-all rounded-full"></div>
          <IoMdClose className="w-6 h-6 text-red-700" />
        </button>

        <div className="mr-4">
          <div className="flex space-x-3">
            {inputs.map((input, i) => {
              return (
                <div key={i} className="space-x-1">
                  <span className="text-sm text-gray-500">{input.title}:</span>
                  <span className="text-sm">{input.value}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <div>
                <div>{mainResult.title}</div>
                <div className="ml-3 text-2xl font-bold text-red-700">
                  {mainResult.value}
                </div>
              </div>
              <div className="ml-1 mt-2">
                {subResults.map((result, i) => {
                  return (
                    <div key={i}>
                      <div className="text-sm text-gray-500">
                        {result.title}
                      </div>
                      <div className="ml-3">{result.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {remarks !== "" && (
              <div className="col-span-2 flex flex-col space-y-1">
                <div className="text-sm text-gray-500">備考</div>
                <div className="border border-gray-400 p-3 rounded-lg grow break-words">
                  <p>{remarks}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
