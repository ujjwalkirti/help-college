import React from "react";

function Card({ option }) {
  return (
    <div className="border flex flex-col m-3 items-center p-2 rounded-md hover:shadow-lg h-40 justify-evenly">
      <p>{option.name}</p>
      <a href={`${option.url}`} className="border-black border p-1 hover:bg-black hover:text-white rounded-sm">
        I need help
      </a>
    </div>
  );
}

export default Card;
