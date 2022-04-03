import axios from "axios";
import React from "react";
import Navbar from "../components/Navbar";

function Reviews() {
  const [studentChapters, setStudentChapters] = React.useState([]);
  const [dormitories, setDormitories] = React.useState([]);
  const [viewHostel, setViewHostel] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("/api/getStudentChapters")
      .then(function (response) {
        // handle success
        // console.log(response.data);
        if (response.data !== []) {
          setStudentChapters(response.data);
        } else {
          alert("No student chapter found!");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    axios
      .get("/api/getDormitories")
      .then(function (response) {
        // handle success
        // console.log(response.data);
        if (response.data !== []) {
          setStudentChapters(response.data);
        } else {
          alert("No dormitory/hostel found!");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const divStyle = "w-screen";
  const noDivStyle = "";

  const selectedButtonStyle = "w-1/2  bg-black text-white p-2 border";
  const notSelectedButtonStyle = "w-1/2 bg-white text-black p-2 border";

  return (
    <div>
      <Navbar />
      <div className="mt-4">
        <div className="font-bold text-3xl">
          {" "}
          <button
            className={`${
              viewHostel ? selectedButtonStyle : notSelectedButtonStyle
            }`}
            onClick={() => {
              setViewHostel(true);
            }}
          >
            Hostels
          </button>
          <button
            className={`${
              !viewHostel ? selectedButtonStyle : notSelectedButtonStyle
            }`}
            onClick={() => {
              setViewHostel(false);
            }}
          >
            Student Chapters
          </button>
        </div>
        <div className={`${viewHostel ? divStyle : noDivStyle}`}>
          {dormitories.map((dorm, index) => {
            return <div>dorm {index + 1}</div>;
          })}
        </div>
        <div className={`${!viewHostel ? divStyle : noDivStyle}`}>
          {studentChapters.map((studentChapter, index) => {
            return <div>student_chapter {index + 1}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
