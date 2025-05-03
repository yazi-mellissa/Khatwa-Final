import React, { useState } from 'react';

function Toggle(props) {
  const {on, setOn,key} = props

  const handleToggle = () => {
    console.log('hhhh')
    setOn(prev=>!prev);
  };

  return (
    <div className="relative inline-block w-10 align-middle select-none duration-300">
      <input
        type="checkbox"
        name="toggle"
        id={key}
        className={`toggle-checkbox absolute block w-6 h-6 rounded-full border-4 ${!on?'bg-white ':' bg-orange-1 border-light-orange-1 right-0'} appearance-none cursor-pointer duration-100`}
        onChange={handleToggle}
        checked={on}
      />
      <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
    </div>
  );
}

export default Toggle;
