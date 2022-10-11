import { FormEventHandler, ReactNode } from "react";
import { Button } from "../ui/Button";

type Props = {
  title: string;
  inputs: ReactNode;
  result: ReactNode;
  onSimulate: FormEventHandler<HTMLFormElement>;
};
export const SimulatorLayout: React.FC<Props> = ({
  title,
  inputs,
  result,
  onSimulate,
}) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSimulate(e);
  };

  return (
    <div className="flex flex-col w-[800px] bg-gray-100 rounded-lg px-4 py-6 space-y-6 shadow-lg">
      <h3 className="text-xl text-red-700 select-none">{title}</h3>
      <div className="flex-grow grid grid-cols-2 gap-3">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1">{inputs}</div>
          <Button>計算する</Button>
        </form>
        {result}
      </div>
    </div>
  );
};
