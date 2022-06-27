import axios from "axios";
import React from "react";
import Navbar from "../components/Navbar";
import ReviewsCard from "../components/ReviewsCard";
import SuggestionBox from "../components/SuggestionBox";

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
          setDormitories(response.data);
        } else {
          alert("No dormitory/hostel found!");
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const divStyle =
    "md:w-4/5 mx-auto grid md:grid-cols-3 xl:grid-cols-4 grid-cols-1";
  const noDivStyle = "hidden";

  const selectedButtonStyle = "w-1/2 bg-black md:text-2xl text-white p-2 font-bold border";
  const notSelectedButtonStyle = "w-1/2 font-bold bg-white text-black md:text-2xl p-2 border";
  const description =
    "SVNIT, Surat has a dozen of student chapters which makes it quite difficult for any newbie or fresher to decide which club or chapter is best suited for him. But worry no more, as here you will get to read about first hand reviews about not only student chapters and clubs but even hostels and other facilities provided by the institute.";

  const backgroundStyle = {
    backgroundImage: "url('wallpapers/6.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  return (
    <div className="min-h-screen" style={backgroundStyle}>
      <Navbar />
      <p className="italic text-2xl bg-white my-2 p-2 text-center font-bold w-4/5 mx-auto rounded-xl">
        "{description}"
      </p>
      <div className="mt-4">
        <div className="font-bold flex">
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
            return <ReviewsCard entity={dorm} type="dormitories" />;
          })}
        </div>
        <div className={`${!viewHostel ? divStyle : noDivStyle}`}>
          {studentChapters.map((studentChapter, index) => {
            return (
              <ReviewsCard entity={studentChapter} type="student chapter" />
            );
          })}
        </div>
      </div>
      <SuggestionBox />
    </div>
  );
}

export default Reviews;
