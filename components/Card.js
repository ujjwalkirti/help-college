import Image from "next/image";
import React from "react";


function Card({ option }) {
  return (
    <a
      href={`${option.url}`}
      className="border flex flex-col m-3 bg-white items-center p-2 rounded-md hover:shadow-xl justify-evenly transition ease-in-out delay-150 hover:scale-105 hover:bg-yellow-500 duration-300 relative"
    >
      <p className="text-center absolute z-40 bg-white px-2 py-1 rounded-md font-bold italic md:text-4xl mb-4 mx-3">
        {option.name} {option.emoji}
      </p>
      <Image src={option.backgroundImg} height={500} width={600} />
    </a>
  );
}

export default Card;
