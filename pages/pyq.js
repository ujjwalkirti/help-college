import axios from "axios";
import React from "react";
import Navbar from "../components/Navbar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/Firebase/Firebase";

function Pyq() {
  const [subjects, setSubjects] = React.useState([]);
  const [branches, setBranches] = React.useState([]);
  const [examType, setExamType] = React.useState("");
  const [error, setError] = React.useState("");
  const [years, setYears] = React.useState([]);
  const [btechYear, setBtechYear] = React.useState("");
  const [chosenSubject, setChosensubject] = React.useState("");
  const [branch, setBranch] = React.useState({ name: "", code: "" });
  const [year, setYear] = React.useState("");
  const [url, setUrl] = React.useState("");

  const btech_years = [
    "BTech I",
    "BTech II",
    "BTech III",
    "BTech IV",
    "MSc I",
    "MSc II",
    "MSc III",
    "MSc IV",
    "MSc V",
  ];

  React.useEffect(() => {
    axios
      .get("/api/getBranches")
      .then((response) => {
        // console.log(response.data);
        setBranches(response.data);
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
  }, [branches, examType, year]);

  React.useEffect(async () => {
    if (branch.name != "" && btechYear != "") {
      const docRef = doc(db, btechYear, branch.name);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        setSubjects(docSnap.data().data);
      } else {
        // doc.data() will be undefined in this case
        setSubjects(["No data available!"]);
        // console.log("No such document!");
      }
    }
  }, [branch, btechYear]);

  const buttonStyle =
    "bg-blue-500 mx-auto p-2 rounded-sm text-white font-bold mt-2 cursor-pointer hover:shadow-lg";

  const handleSubmit = (e) => {
    e.preventDefault();

    setYear(e.target[0].value);
    // setBtechYear(e.target[1].value);
    setChosensubject(e.target[5].value);

    if (e.target[3].checked) {
      setExamType("end-sem");
    } else if (e.target[4].checked) {
      setExamType("mid-sem");
    } else {
      setError("You have not selected any exam type!");
    }

    const object = {
      year: year,
      btech_year: btechYear,
      branch: branch,
      exam: examType,
      sub: chosenSubject,
      url: url,
    };
  };

  const description =
    "You will get all the previous year question papers of mid semester and end semester examinations for all the branches here!";

  // const backgroundStyle = {
  //   backgroundImage: "url('wallpapers/2.webp')",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  // };

  return (
    <div className="bg-gradient-to-br from-red-400 to-yellow-300 min-h-screen">
      <Navbar />
      <p className="italic text-2xl text-center font-bold md:w-3/5 mx-auto mb-10 md:mb-3">
        "{description}"
      </p>
      <div className="md:w-3/5 mx-auto">
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
          <label for="year">Please select academic year:</label>
          <select id="year" className="border border-black p-2 m-2">
            {years.map((year) => {
              return <option>{year}</option>;
            })}
          </select>

          <label for="year" className="flex">
            Select your year:
            <p className="ml-2 text-red-700">
              As in BTech 1<sup>st</sup>, BTech 2<sup>nd</sup> etc.
            </p>
          </label>
          <select
            onClick={(e) => {
              setBtechYear(e.target.value);
            }}
            id="year"
            className="border border-black p-2 m-2"
          >
            {btech_years.map((year) => {
              return <option>{year}</option>;
            })}
          </select>

          <label for="branch">Please select your branch:</label>
          <select
            onClick={(e) => {
              branches.map((branch) => {
                if (branch.name === e.target.value) {
                  const localObject = {
                    name: branch.name,
                    code: branch.code,
                  };
                  setBranch(localObject);
                }
              });
            }}
            id="branch"
            className="border border-black p-2 m-2"
          >
            {branches.map((branch) => {
              return <option>{branch.name}</option>;
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

          {subjects.length != 0 && (
            <div className="flex flex-col">
              <label className="text-center">
                Finally select your subject:
              </label>
              <select className="border border-black p-2 m-2">
                {subjects.map((subject) => {
                  return <option>{subject}</option>;
                })}
              </select>
            </div>
          )}

          <input type="submit" className={buttonStyle} />
        </form>
      </div>
      <p className="text-center bg-white text-lg">
        <strong>Note</strong> : If you guys know subjects that are missing,
        please help in making it correct.
        <br />
        Add them{" "}
        <a
          href="/admin/add-subjects-to-branches"
          className="text-blue-600 hover:underline cusrsor-pointer"
        >
          here
        </a>
        !
      </p>
    </div>
  );
}

export default Pyq;
