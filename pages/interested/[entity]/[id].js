import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { db } from "../../../components/Firebase/Firebase";
import Navbar from "../../../components/Navbar";

const StationaryInfo = () => {
  const router = useRouter();

  const [target_object, setTarget_object] = React.useState([]);

  const { entity, id } = router.query;

  React.useEffect(() => {
    // console.log(entity);
    if (typeof entity !== "undefined") {
      const infoRef = collection(db, entity);
      if (id) {
        const q = query(infoRef, where("uid", "==", id));
        onSnapshot(q, (snapshot) => {
          let data = [];
          snapshot.docs.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
          setTarget_object(data[0]);
          // console.log(data[0]);
        });
      }
    }
  }, [id, entity]);

  return (
    <div>
      <Navbar />

      <div className="w-3/5 border border-b border-black mx-auto m-4 flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col items-center justify-evenly">
          <p className="text-4xl font-bold">{target_object.name}</p>

          <p className="text-2xl">"{target_object.description}"</p>
          <p className="italic">Rs. {target_object.cost}</p>
          <div className="">
            <p className="">Owner: {target_object.ownerName}</p>
            <p className="">Contact: {target_object.contact}</p>
          </div>
        </div>
        <div className="md:w-1/2 border">
          <img className="h-full" src={target_object.image} />
        </div>
      </div>
      <p className="text-center text-red-600 text-2xl">
        <strong>Note:</strong> We don't claim the authenticity of details
        provided above, and hence deal at your own risk.
      </p>
    </div>
  );
};

export default StationaryInfo;
