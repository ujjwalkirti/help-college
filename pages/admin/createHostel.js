import React from "react";

const createHostel = () => {
  const [name, setName] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <p className="text-center font-bold text-5xl m-4">Form to add a hostel</p>
      <form
        onSubmit={handleSubmit}
        className="border flex flex-col border-black w-2/5 mx-auto p-2"
      >
        <input
          type="text"
          placeholder="Enter Hostel Name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input type="text" />
        <input
          type="submit"
          className="bg-black border border-black text-white w-2/5 mx-auto font-semibold rounded-lg p-2 text-xl hover:bg-white hover:text-black cursor-pointer"
        />
      </form>
    </div>
  );
};

export default createHostel;
