import React from "react";

function Stationary_Card({ stationary, entity }) {
  const trimSentences = (sentence) => {
    if (typeof sentence !== "undefined") {
      return sentence.slice(0, 100) + "...";
    }
  };

  return (
    <div className="m-2 border border-black p-2 flex flex-col">
      <p className="text-3xl font-semibold text-center bg-black text-white p-2 mb-2">
        {stationary.name}
      </p>
      <img className="w-full" src={stationary.image} />

      <a
        href={`/interested/${entity}/${stationary.uid}`}
        className="bg-blue-500 text-center mx-auto p-2 rounded-sm text-white font-bold mt-2 hover:shadow-lg"
      >
        I'm interested!
      </a>
    </div>
  );
}

export default Stationary_Card;
