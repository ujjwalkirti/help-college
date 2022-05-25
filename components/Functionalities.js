import axios from "axios";
import React from "react";
import Card from "./Card";

function Functionalities() {
  const [functionalities, setFunctionalities] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios
      .get("/api/getfunctionalities")
      .then(function (response) {
        // handle success
        setFunctionalities(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="w-4/6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mt-2">
        {functionalities.map((functionality) => {
          return <Card option={functionality} />;
        })}
      </div>
      {loading && (
        <img src="spinner.jpg" className="h-72 rounded-full mx-auto" />
      )}
    </div>
  );
}

export default Functionalities;
