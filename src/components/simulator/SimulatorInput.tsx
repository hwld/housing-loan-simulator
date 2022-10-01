import { forwardRef, useId } from "react";
import { FieldError } from "react-hook-form";
import { Input, InputProps } from "../ui/Input";

type Props = { label: string; unit: string; error?: FieldError } & InputProps;

// eslint-disable-next-line react/display-name
export const SimulatorInput: React.FC<Props> = forwardRef<
  HTMLInputElement,
  Props
>(({ label, unit, error, ...props }, ref) => {
  const inputId = useId();
  const isError = error !== undefined;

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <div className="mt-2 grid grid-cols-8 items-center">
        <div className="col-span-7">
          <Input
            ref={ref}
            textRight
            isError={isError}
            id={inputId}
            {...props}
          />
        </div>
        <p className="ml-2">{unit}</p>
      </div>
      <div className="h-5 mt-1">
        <p className="ml-3 text-sm text-red-400">{error?.message}</p>
      </div>
    </div>
  );
});
