import { useState } from "react";

function CheckBox(props) {
  const [checked, setChecked] = useState(false);

  function handleChange(event) {
    setChecked(event.target.checked);
    if (props.onChange) {
      props.onChange(event.target.checked);
    }
  }

  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-black "
        checked={checked}
        onChange={handleChange}
      />
      <span className="ml-2">{props.label}</span>
    </label>
  );
}

export default CheckBox;
