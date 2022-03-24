import React from "react";

function Stationary_Card({ stationary }) {
  return (
    <div className="m-2 border border-black p-2 flex flex-col">
      <p className="text-3xl font-semibold text-center bg-black text-white p-2 mb-2">
        {stationary.name}
      </p>
      <img className="" src={stationary.image} />
      <button className="bg-blue-500 mx-auto p-2 rounded-sm text-white font-bold mt-2 hover:shadow-lg">
        I'm interested!
      </button>
    </div>
  );
}

export default Stationary_Card;
