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
import { useLocalStorage } from "../../hooks/useLocalStorage";

type SimulatorParams<FormData, Result> = {
  key: string;
  innerSimulate: (formData: FormData) => Result;
  formDataSchema: z.Schema<FormData>;
};

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
>({
  innerSimulate,
  formDataSchema,
  key,
}: SimulatorParams<SimulatorFormData, SimulatorResult>): UseSimulatorResult<
  SimulatorFormData,
  SimulatorResult
> => {
  const [simulationResult, setSimulationResult] = useState<
    (SimulatorFormData & SimulatorResult) | undefined
  >(undefined);

  const {
    value: simulationHistory,
    writeValue,
    removeValue,
  } = useLocalStorage<
    (SimulatorFormData & SimulatorResult & { id: string; remarks: string })[]
  >(key);

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

      writeValue((histories) => {
        return [
          { ...history, id: Math.random().toString(), remarks },
          ...(histories ?? []),
        ];
      });
    };

    return buildSubmitHandler(handleSubmit);
  }, [buildSubmitHandler, getValues, innerSimulate, remarks, writeValue]);

  const removeHistory = (index: number) => {
    if (index < 0 && simulationHistory && index >= simulationHistory.length) {
      return;
    }

    writeValue((histories) => {
      return histories?.filter((_, i) => {
        return i !== index;
      });
    });
  };

  const removeAllHistories = () => {
    removeValue();
  };

  return {
    simulator: {
      simulate,
      simulationResult,
      simulationInputs: { register, errors },
      remarks,
      handleChangeRemarks,
    },
    simulationHistory: simulationHistory ?? [],
    removeHistory,
    removeAllHistories,
  };
};
