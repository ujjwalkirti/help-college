import axios from "axios";
import React from "react";
import Navbar from "../components/Navbar";

function Pyq() {
  const [subjects, setSubjects] = React.useState([]);
  const [subject, setSubject] = React.useState("");
  const [examType, setExamType] = React.useState("");
  const [error, setError] = React.useState("");
  const [years, setYears] = React.useState([]);
  const [year, setYear] = React.useState("");

  React.useEffect(() => {
    axios
      .get("/api/getSubjects")
      .then((response) => {
        // console.log(response.data);
        setSubjects(response.data);
      })
      .catch((error) => {
        alert("Something went wrong!");
      });

    axios
      .get("/api/years")
      .then((response) => {
        setYears(response.data);
      })
      .catch((error) => {
        alert("Something went wrong!");
      });
  }, []);

  React.useEffect(() => {
    // console.log(subject, examType, year);
    if (error !== "") {
      if (examType !== "") {
        setError("");
      }
    }
  }, [subject, examType, year]);

  const buttonStyle =
    "bg-blue-500 mx-auto p-2 rounded-sm text-white font-bold mt-2 cursor-pointer hover:shadow-lg";

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(e.target[2].checked);

    // console.log(e.target[0].value);

    setSubject(e.target[0].value);

    setYear(e.target[3].value);

    if (e.target[1].checked) {
      setExamType("end-sem");
    } else if (e.target[2].checked) {
      setExamType("mid-sem");
    } else {
      setError("You have not selected any exam type!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-2/5 mx-auto">
        {error !== "" && (
          <div className="text-red-600 flex justify-center items-center p-2 m-2 rounded-md font-semibold bg-red-300 relative">
            {error}
            <p
              className="text-white border border-white rounded-full mr-2 flex items-center justify-center absolute right-0 h-8 text-center w-8 cursor-pointer hover:shadow-lg"
              onClick={() => {
                setError("");
              }}
            >
              X
            </p>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center border border-black p-2 m-2"
        >
          <label for="subject">Please select your branch:</label>
          <select id="subject" className="border border-black p-2 m-2">
            {subjects.map((subject) => {
              return <option>{subject.name}</option>;
            })}
          </select>
          <div className="flex flex-col items-center">
            <label>Mid-sem or End-sem?</label>

            <div className="border border-black p-2 m-2">
              <input
                type="radio"
                id="end-sem"
                name="fav_language"
                value="end-sem"
              />
               <label for="end-sem">End Semester</label> {" "}
              <input
                type="radio"
                id="mid-sem"
                name="fav_language"
                value="mid-sem"
              />
               <label for="css">Mid Semester</label>
            </div>
          </div>
          <label for="year">Please select academic year:</label>
          <select id="year" className="border border-black p-2 m-2">
            {years.map((year) => {
              return <option>{year}</option>;
            })}
          </select>
          <input type="submit" className={buttonStyle} />
        </form>
      </div>
    </div>
  );
}

export default Pyq;
