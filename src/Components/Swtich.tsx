import ReactSwitch from "react-switch";
interface SwitchProps {
   value?: boolean;
   onChange: (checked: boolean) => void;
}

//Renders a swtich component for boolean column
const Switch: React.FC<SwitchProps> = ({ value, onChange }) => {
   return (
      <ReactSwitch
         checked={Boolean(value)}
         onChange={(checked) => onChange(checked)}
         height={20}
         width={30}
         handleDiameter={14}
         checkedIcon={<></>}
         uncheckedIcon={<></>}
         onColor="#0D9488"
         offColor="#3F3F46"
      ></ReactSwitch>
   );
};

export default Switch;
