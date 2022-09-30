type Props = { title: string; result: string };
export const SubResultCard: React.FC<Props> = ({ title, result }) => {
  return (
    <div className="bg-gray-100 w-full px-4 py-3 rounded shadow">
      <p>{title}</p>
      <p className="ml-2">{result}</p>
    </div>
  );
};
