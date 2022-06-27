import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { db } from "../components/Firebase/Firebase";
import Navbar from "../components/Navbar";

const Suggestions = () => {
  const { data: session } = useSession();
  const [complaint, setComplaint] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // get a new date (locale machine date time)
    var date = new Date();
    // get the date as a string
    var n = date.toDateString();
    // get the time as a string
    var time = date.toLocaleTimeString();

    addDoc(collection(db, "complaints"), {
      author: name === "" ? session.user.name : name,
      date_time: { n, time },
      complaint: complaint,
    })
      .then((doc) => {
        alert("Your complaint/suggestion has been submitted with our team.");
        setName("");
        setComplaint("");
        setLoading(false);
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  return (
    <div className="bg-gradient-to-br min-h-screen from-red-500 via-yellow-500 to-yellow-300">
      <Navbar />
      {loading && (
        <div className="absolute min-h-screen bg-opacity-70 flex justify-center items-center bg-slate-600 min-w-full">
          <img src="/spinner.jpg" className=" h-32 mx-auto rounded-full" />
        </div>
      )}
      <p className="text-center font-bold text-white text-2xl md:text-4xl my-5">
        Complains and Suggestions
      </p>
      <div className="flex justify-center md:w-3/5 w-full mx-auto">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            setLoading(true);
          }}
          className="border border-white p-2 w-full flex flex-col mx-2"
        >
          <textarea
            type="text"
            required
            value={complaint}
            onChange={(e) => {
              setComplaint(e.target.value);
            }}
            className="px-2 py-1 h-96"
            placeholder="Enter your complaint"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="my-2 px-2 py-1"
            placeholder="Enter your name"
          />
          <p>
            <strong>Note</strong>: It is not necessary to mention your name,
            even if you don't mention we will populate it with the same from
            your gmail account!
          </p>
          <button className="bg-white mx-auto text-xl my-2 rounded-lg font-semibold w-40 shadow-blue-800 hover:shadow-lg ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Suggestions;
