import React from "react";

function Card({ option }) {
  return (
    <a
      href={`${option.url}`}
      className="border flex flex-col m-3 bg-white items-center p-2 rounded-md hover:shadow-xl h-40 justify-evenly h-60 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-500 duration-300"
    >
      <p className="text-center font-bold italic md:text-4xl">{option.name}</p>
      <p className="md:text-4xl">{option.emoji}</p>
    </a>
  );
}

export default Card;
