type Props = { title: string; result?: number };
export const SubResultCard: React.FC<Props> = ({ title, result = 0 }) => {
  return (
    <div className="bg-gray-100 w-full px-4 py-3 rounded shadow">
      <p>{title}</p>
      <p className="ml-2 text-lg">
        {`${Math.round(result).toLocaleString()}`}
        <span className="text-sm">円</span>
      </p>
    </div>
  );
};
