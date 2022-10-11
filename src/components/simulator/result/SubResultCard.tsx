import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

type Props = { title: string; result?: number };
export const SubResultCard: React.FC<Props> = ({ title, result = 0 }) => {
  const control = useAnimationControls();

  useEffect(() => {
    control.set({ opacity: 0 });
    control.start({ opacity: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className="bg-gray-100 w-full px-4 py-3 rounded shadow">
      <p className="font-normal">{title}</p>
      <motion.p className="ml-2 text-lg font-bold" animate={control}>
        {`${Math.round(result).toLocaleString()}`}
        <span className="text-sm">円</span>
      </motion.p>
    </div>
  );
};
