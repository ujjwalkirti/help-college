import React from "react";

function Stationary_Card({ stationary, entity }) {
  const [hovered, setHovered] = React.useState(false);
  const trimSentences = (sentence) => {
    if (typeof sentence !== "undefined") {
      return sentence.slice(0, 100) + "...";
    }
  };

  return (
    <div
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseOut={() => {
        setHovered(false);
      }}
      className={`${
        hovered
          ? "p-2 m-2 rounded-xl bg-gradient-to-br from-red-600 via-yellow-600 to-yellow-300"
          : "m-2 p-2"
      }`}
    >
      <div className="bg-white rounded-xl py-2 flex flex-col hover:shadow">
        <p className="text-3xl font-semibold text-center bg-black text-white p-2 mb-2">
          {stationary.name}
        </p>
        <img className="h-72" src={stationary.image} />

        <a
          href={`/interested/${entity}/${stationary.uid}`}
          className="bg-blue-500 text-center mx-auto p-2 rounded-sm text-white font-bold mt-2 hover:shadow-lg"
        >
          I'm interested!
        </a>
      </div>
    </div>
  );
}

export default Stationary_Card;
