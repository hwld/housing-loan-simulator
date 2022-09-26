type Props = { label: string; unit: string };

export const SimulatorInput: React.FC<Props> = ({ label, unit }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label>{label}</label>
      <div className="flex items-center space-x-3">
        <input type="number" className="grow p-2 rounded-md text-right"></input>
        <p>{unit}</p>
      </div>
    </div>
  );
};
