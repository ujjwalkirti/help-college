import axios from "axios";
import React from "react";
import Card from "./Card";

function Functionalities() {
  const [functionalities, setFunctionalities] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/getfunctionalities")
      .then(function (response) {
        // handle success
        setFunctionalities(response.data);
        console.log(functionalities);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="w-4/6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-white mt-2">
      {functionalities.map((functionality) => {
        return <Card option={functionality} />;
      })}
    </div>
  );
}

export default Functionalities;
