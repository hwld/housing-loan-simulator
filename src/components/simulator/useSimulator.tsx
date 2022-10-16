import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent, ChangeEvent, useMemo, useState } from "react";
import {
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { z } from "zod";

export type SimulatorProps<FormData extends FieldValues, Result> = {
  simulate: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  simulationResult: (Result & FormData) | undefined;
  simulationInputs: {
    register: UseFormRegister<FormData>;
    errors: FieldErrorsImpl<DeepRequired<FormData>>;
  };
  remarks: string;
  handleChangeRemarks: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

type UseSimulatorResult<FormData extends FieldValues, Result> = {
  simulator: SimulatorProps<FormData, Result>;
  simulationHistory: (FormData & Result)[];
};

export const useSimulator = <
  SimulatorFormData extends FieldValues,
  SimulatorResult
>(
  innerSimulate: (formData: SimulatorFormData) => SimulatorResult,
  formDataSchema: z.Schema<SimulatorFormData>
): UseSimulatorResult<SimulatorFormData, SimulatorResult> => {
  const [simulationResult, setSimulationResult] = useState<
    (SimulatorFormData & SimulatorResult) | undefined
  >(undefined);

  const [simulationHistory, setSimulationHistory] = useState<
    (SimulatorFormData & SimulatorResult)[]
  >([]);

  const [remarks, setRemarks] = useState("");
  const handleChangeRemarks = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRemarks(e.target.value);
  };

  const {
    register,
    handleSubmit: buildSubmitHandler,
    formState: { errors },
    getValues,
  } = useForm<SimulatorFormData>({
    resolver: zodResolver(formDataSchema),
  });

  const simulate = useMemo(() => {
    const handleSubmit: SubmitHandler<SimulatorFormData> = (formData) => {
      const result = innerSimulate(formData);
      const history = { ...result, ...getValues() };
      setSimulationResult(history);

      setSimulationHistory((histories) => {
        return [history, ...histories];
      });
    };

    return buildSubmitHandler(handleSubmit);
  }, [buildSubmitHandler, getValues, innerSimulate]);

  return {
    simulator: {
      simulate,
      simulationResult,
      simulationInputs: { register, errors },
      remarks,
      handleChangeRemarks,
    },
    simulationHistory,
  };
};
