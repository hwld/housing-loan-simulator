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
  simulationHistory: (FormData & Result & { id: string; remarks: string })[];
  removeHistory: (index: number) => void;
  removeAllHistories: () => void;
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
    (SimulatorFormData & SimulatorResult & { id: string; remarks: string })[]
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
        return [
          { ...history, id: Math.random().toString(), remarks },
          ...histories,
        ];
      });
    };

    return buildSubmitHandler(handleSubmit);
  }, [buildSubmitHandler, getValues, innerSimulate, remarks]);

  const removeHistory = (index: number) => {
    if (index < 0 && index >= simulationHistory.length) {
      return;
    }

    setSimulationHistory((history) => {
      return history.filter((_, i) => {
        return i !== index;
      });
    });
  };

  const removeAllHistories = () => {
    setSimulationHistory([]);
  };

  return {
    simulator: {
      simulate,
      simulationResult,
      simulationInputs: { register, errors },
      remarks,
      handleChangeRemarks,
    },
    simulationHistory,
    removeHistory,
    removeAllHistories,
  };
};
