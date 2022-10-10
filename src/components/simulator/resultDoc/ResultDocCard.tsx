import { clsx } from "../../../classnames";

type Props = { title: string; value: string; size?: "md" | "lg" };
export const ResultDocCard: React.FC<Props> = ({
  title,
  value,
  size = "md",
}) => {
  return (
    <div className="p-3 bg-gray-100 rounded">
      <div className={clsx("text-gray-500", size === "lg" && "text-xl")}>
        {title}
      </div>
      <div
        className={clsx(
          "ml-3 font-bold",
          size === "lg" && "text-3xl",
          size == "md" && "text-xl"
        )}
      >
        {value}
      </div>
    </div>
  );
};
