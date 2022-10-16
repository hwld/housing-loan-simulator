type Item = { title: string; value: string };
type Props = {
  mainResult: Item;
  subResults?: Item[];
  inputs: Item[];
  remarks: string;
};
export const SimulationHistoryItem: React.FC<Props> = ({
  mainResult,
  subResults = [],
  inputs,
  remarks,
}) => {
  return (
    <div className="p-4 bg-gray-200 rounded-lg space-y-2">
      <div className="grid grid-cols-2 space-x-3">
        <div className="space-y-2">
          <div>
            <div>{mainResult.title}</div>
            <div className="ml-3 text-lg font-bold">{mainResult.value}</div>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {subResults.map((result, i) => {
              return (
                <div key={i}>
                  <div className="text-sm text-gray-500">{result.title}</div>
                  <div className="ml-3 font-bold">{result.value}</div>
                </div>
              );
            })}
          </div>
        </div>
        {remarks !== "" && (
          <div className="grow flex flex-col space-y-1">
            <div className="mt-3 text-gray-500">備考</div>
            <div className="border border-gray-400 p-3 rounded-lg grow break-words">
              {remarks}
            </div>
          </div>
        )}
      </div>
      <div className="flex space-x-3">
        {inputs.map((input, i) => {
          return (
            <div key={i} className="space-x-1">
              <span className="text-sm text-gray-500">{input.title}:</span>
              <span className="text-sm font-bold">{input.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
