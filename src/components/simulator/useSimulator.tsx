import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const useSimulator = <
  SimulatorFormData extends FieldValues,
  SimulatorResult
>(
  innerSimulate: (formData: SimulatorFormData) => SimulatorResult,
  formDataSchema: z.Schema<SimulatorFormData>
) => {
  const [simulationResult, setSimulationResult] = useState<
    (SimulatorFormData & SimulatorResult) | undefined
  >(undefined);

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
      setSimulationResult({ ...result, ...getValues() });
    };

    return buildSubmitHandler(handleSubmit);
  }, [buildSubmitHandler, getValues, innerSimulate]);

  return {
    simulate,
    simulationResult,
    simulationInputs: { register, errors },
    remarks,
    handleChangeRemarks,
  };
};
