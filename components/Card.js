import React from "react";

function Card({ option }) {
  return (
    <div className="border flex flex-col m-3 bg-white items-center p-2 rounded-md hover:shadow-lg h-40 justify-evenly">
      <p className="text-center font-bold italic text-xl">{option.name}</p>
      <p>{option.emoji}</p>
      <a
        href={`${option.url}`}
        className="border-black border p-1 hover:bg-black hover:text-white rounded-sm"
      >
        I need help
      </a>
    </div>
  );
}

export default Card;
