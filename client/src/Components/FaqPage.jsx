import React, { useState } from 'react';

function FaqPage({ text, title }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const color = isClicked ? '#F1C1B4' : '#F6F6F6';
  const textcolor = isClicked ? '#E35936' : '#000000';
  return (
    <div className="bg-white font-body ">
  <div className="max-w-2xl mt-10 mb-5 mx-5 sm:mx-14 px-9 py-5 flex items-center justify-between rounded-lg cursor-pointer" onClick={handleClick} style={{ backgroundColor: color }}>
    <h3 className="font-outfit font-bold text-start uppercase text-base" style={{ color: textcolor, maxWidth: '75%' }}>{title}</h3>

    {isClicked ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={textcolor} class="bi bi-dash-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
    )}
  </div>
  {isClicked && <p className="text-base ml-5 sm:ml-20 capitalize">{text}</p>}
</div>

  );
}
export default FaqPage;
