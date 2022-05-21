import { useRouter } from "next/router";
import React from "react";
import Navbar from "../../../components/Navbar";

const StationaryInfo = () => {
  const router = useRouter();

  const { entity, id } = router.query;

  return (
    <div>
      <Navbar/>
      {entity}
      or bhai kaisi lagi bakchodi?

      {id}
    </div>
  );
};

export default StationaryInfo;
