import { ChangeEventHandler, FormEventHandler, ReactNode } from "react";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { SimulatorAccordion } from "./SimulatorAccordion";

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

  return (
    <div className="flex flex-col w-[600px] shrink-0 bg-gray-100 rounded-lg space-y-6 shadow h-fit">
      <div className="bg-red-700 rounded-t-lg p-4">
        <h3 className="text-2xl text-gray-100 font-bold select-none">
          {title}
        </h3>
      </div>
      <div className="px-4 flex-grow grid grid-cols-12 gap-5">
        <form className="space-y-6 col-span-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">{inputs}</div>
          <Button>計算する</Button>
        </form>
        <div className="col-span-8">{result}</div>
      </div>
      <SimulatorAccordion title="備考欄">
        <Textarea
          rows={6}
          value={remarks}
          onChange={onChangeRemarks}
          resize={false}
        />
      </SimulatorAccordion>
    </div>
  );
};
