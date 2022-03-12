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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {functionalities.map((functionality) => {
        return <Card option={functionality} />;
      })}
    </div>
  );
}

export default Functionalities;
