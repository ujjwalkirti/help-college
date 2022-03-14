import React from "react";


function Stationaries() {
  const [wantsToBuy, setWantsToBuy] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    
    
  };

  return (
    <div className="flex flex-col items-center">
      please select your purpose:
      <div className="flex border border-black justify-center w-2/5 mt-3">
        {" "}
        <button
          className="bg-green-500 p-2 m-2 text-white"
          onClick={() => {
            setWantsToBuy(false);
            setShowForm(true);
          }}
        >
          I want to sell
        </button>
        <button
          className="bg-red-500 p-2 m-2 text-white"
          onClick={() => {
            setShowForm(false);

            setWantsToBuy(false);
          }}
        >
          I want to buy
        </button>
      </div>
      {!wantsToBuy && showForm && (
        <form
          onSubmit={handleSubmit}
          className="border border-black m-2 p-2 flex flex-col h-72 justify-evenly"
        >
          <input type="text" placeholder="Enter the name of Product" required />
          <input type="file" placeholder="Upload the image" required />
          <input
            type="submit"
            className="border border-black hover:shadow-md rounded-lg"
            value="Please submit"
          />
        </form>
      )}
      {wantsToBuy && <div></div>}
    </div>
  );
}

export default Stationaries;
