import { ChangeEventHandler, FormEventHandler, ReactNode } from "react";
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
      <div className="flex flex-col space-y-2">
        <label>備考欄</label>
        <Textarea rows={6} value={remarks} onChange={onChangeRemarks} />
      </div>
    </div>
  );
};
