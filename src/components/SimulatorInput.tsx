import { Input } from "./Input";

type Props = { label: string } & (
  | {
      unit: string;
      unitClass?: string;
    }
  | { unit?: never; unitClass?: never }
);

export const SimulatorInput: React.FC<Props> = ({ label, unit }) => {
  return (
    <div>
      <label>{label}</label>
      <div className="mt-2 grid grid-cols-8 items-center">
        <div className="col-span-7">
          <Input textRight />
        </div>
        <p className="ml-2">{unit}</p>
      </div>
    </div>
  );
};
