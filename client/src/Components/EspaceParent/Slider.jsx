import { useState } from "react";

function Slider(props) {


  return (
    <div className="flex items-center">
     
      <input
        type="range"
        min={props.min} // valeur minimale passée en tant que prop
        max={props.max} // valeur maximale passée en tant que prop
        value={props.value}
        onChange={()=>props.onChange()}
        className="slider appearance-none h-3 w-50 bg-gray-300 rounded-full outline-none mr-2"
      />
       <span className="mr-2">{props.value}</span>
    </div>
  );
}

export default Slider;
