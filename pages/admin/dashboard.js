import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../components/Firebase/Firebase";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  useEffect(async () => {
    const values = await getDocs(collection(db, "complaints"));
    let items = [];
    values.forEach((value) => items.push(value.data()));
    setComplaints(items);
    // console.log(items);
  }, []);
  return (
    <div>
      <Navbar />
      {complaints.map(({ complaint, author }) => {
        return (
          <div className="bg-gray-400 m-2 rounded md:w-3/5 md:mx-auto px-2 py-1">
            <p>"{complaint}"</p>
            <p className="italic text-right font-bold">-{author}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
