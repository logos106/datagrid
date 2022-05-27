export type SingleSelectType = "low" | "medium" | "high";
interface SingleSelectProps {
   value: "low" | "high" | "medium";
}

//Component for the badge of select which render different colors based of values
const SingleSelect: React.FC<SingleSelectProps> = ({ value }) => {
   return <div className={`single-select select-${value}`}>{value}</div>;
};

export default SingleSelect;
