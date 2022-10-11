import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BorrowableByIncomeFormData,
  borrowableByIncomeSchema,
  BorrowableByIncomeSnapshot,
  simulateBorrowableByIncome,
} from "../../../../models/simulator/borrowable/income";

export const useSimulator = () => {
  const [simulationResult, setSimulationResult] = useState<
    BorrowableByIncomeSnapshot | undefined
  >(undefined);

  const {
    register,
    handleSubmit: buildSubmitHandler,
    formState: { errors },
    getValues,
  } = useForm<BorrowableByIncomeFormData>({
    resolver: zodResolver(borrowableByIncomeSchema),
  });

  const simulate = useMemo(() => {
    const handleSubmit: SubmitHandler<BorrowableByIncomeFormData> = (
      formData
    ) => {
      const result = simulateBorrowableByIncome(formData);
      setSimulationResult({ ...result, ...getValues() });
    };

    return buildSubmitHandler(handleSubmit);
  }, [buildSubmitHandler, getValues]);

  return {
    simulate,
    simulationResult,
    simulationInputs: { register, errors },
  };
};
