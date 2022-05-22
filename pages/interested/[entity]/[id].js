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
    console.log(entity);
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
          console.log(data[0]);
        });
      }
    }
  }, [id, entity]);

  return (
    <div>
      <Navbar />
      {entity}
      or bhai kaisi lagi bakchodi?
      {id}
      <div className="w-3/5 border border-b border-black mx-auto rounded-lg flex flex-col items-center">
        <p>{target_object.name}</p>
        <img src={target_object.image} />
        <p>{target_object.description}</p>
        <p>{target_object.cost}</p>
        <p>{target_object.ownerName}</p>
        <p>{target_object.contact}</p>
      </div>
    </div>
  );
};

export default StationaryInfo;
