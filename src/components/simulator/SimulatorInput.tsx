import { useId } from "react";
import { Input, InputProps } from "../ui/Input";

type Props = { label: string; unit: string } & InputProps;

export const SimulatorInput: React.FC<Props> = ({ label, unit, ...props }) => {
  const inputId = useId();
  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <div className="mt-2 grid grid-cols-8 items-center">
        <div className="col-span-7">
          <Input textRight id={inputId} {...props} />
        </div>
        <p className="ml-2">{unit}</p>
      </div>
    </div>
  );
};
