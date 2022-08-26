import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../components/Firebase/Firebase";
import Navbar from "../../components/Navbar";

let global_copy_of_branches = [];

function SubjectsToBranches() {
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
  const [branches, setBranches] = useState([]);
  const [isFirstYear, setFirstYear] = useState(false);
  const [chosenYear, setChosenYear] = useState("");
  const [branch, setBranch] = useState({});

  useEffect(() => {
    axios
      .get("/api/getBranches")
      .then((response) => {
        // console.log(response.data);
        response.data.map((branch) => {
          global_copy_of_branches.push(branch);
        });
      })
      .catch((error) => {
        alert("Something went wrong!");
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const localObject = {
      year: event.target[0].value,
      branch: event.target[1].value,
      subject: event.target[2].value,
    };
    console.log(localObject);

    const docRef = doc(db, localObject.year, localObject.branch);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().data;
      data.push(localObject.subject);
      await setDoc(doc(db, localObject.year, localObject.branch), {
        data: data,
      });
    } else {
      // doc.data() will be undefined in this case
      await setDoc(doc(db, localObject.year, localObject.branch), {
        data: [localObject.subject],
      });
    }

    event.target[2].value = "";
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="flex text-2xl flex-col w-4/5 mx-auto mt-4 p-1 justify-between border"
      >
        <label htmlFor="btech_year">Select the year:</label>
        <select
          id="btech_year"
          onClick={(e) => {
            if (e.target.value == "BTech I" || e.target.value === "MSc I") {
              setFirstYear(true);
            } else {
              setFirstYear(false);
            }
            setChosenYear(e.target.value);
            if (e.target.value.includes("Tech")) {
              let local_copy_of_branches = [];
              global_copy_of_branches.map((branch) => {
                if (branch.name.includes("Engineering")) {
                  local_copy_of_branches.push(branch.name);
                }
              });
              setBranches(local_copy_of_branches);
            } else {
              let local_copy_of_branches = [];
              global_copy_of_branches.map((branch) => {
                if (!branch.name.includes("Engineering")) {
                  local_copy_of_branches.push(branch.name);
                }
              });
              setBranches(local_copy_of_branches);
            }
          }}
          className="border w-4/5 mx-auto my-2"
        >
          {btech_years.map((year) => {
            return <option>{year}</option>;
          })}
        </select>

        {!isFirstYear && branches.length != 0 && (
          <div className="flex flex-col">
            {" "}
            <label>Select the Branch:</label>
            <select className="border w-4/5 mx-auto my-2">
              {branches.map((branch) => {
                return <option>{branch}</option>;
              })}
            </select>
          </div>
        )}

        <input
          type="text"
          className="border-none px-2 py-1"
          placeholder="Enter the subjects name"
        />

        <input
          type="submit"
          className="border border-blue-600 text-blue-600 font-bold rounded-lg my-4"
        />
      </form>
    </div>
  );
}

export default SubjectsToBranches;
