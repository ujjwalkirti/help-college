import React from "react";
import { app, db } from "../components/Firebase/Firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import Progress_bar from "../components/Progress_bar";
import { addDoc, collection } from "firebase/firestore";
import { useSession, signIn } from "next-auth/react";
import axios from "axios";
import Stationary_Card from "../components/Stationary_Card";
import Navbar from "../components/Navbar";

function Stationaries() {
  const [wantsToBuy, setWantsToBuy] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [nameOfProduct, setNameOfProduct] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [productsList, setProductList] = React.useState([]);
  const [imageOfProduct, setImageOfProduct] = React.useState("");
  const [progress, setProgress] = React.useState("");

  const { data: session } = useSession();

  //fetching all the stationaries uploaded for sale
  React.useEffect(() => {
    if (wantsToBuy) {
      if (productsList.length === 0) {
        axios
          .get("/api/getStationaries")
          .then(function (response) {
            // handle success
            // console.log(response.data);

            if (response.data.length === 0) {
              console.log("array is empty");
            } else {
              setProductList(response.data);
            }
          })
          .catch(function (error) {
            // handle error

            console.log(error);
          });
      }
    }
  }, [wantsToBuy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[2].files[0];
    // console.log(e.target[1]);
    if (app) uploadFile(file);
  };

  function uploadFile(file) {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, `/files/stationaries/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
      },
      (err) => {
        console.log(err);
        alert(err.message);
        setProgress("");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          {
            // console.log("File available at", downloadURL);

            addDoc(collection(db, "stationaries"), {
              name: nameOfProduct,
              description: description,
              owner: session.user.email,
              image: downloadURL,
            })
              .then((doc) => {
                setNameOfProduct("");
                alert("Your stationary item uploaded successfully");
                setImageOfProduct("");
                setDescription("");
                setProgress(0);
              })
              .catch((e) => {
                alert(e.message);
              });
          }
        });
      }
    );
  }
  const descriptionOfPage =
    "This is the only place where you can sell and buy second-hand stationary items at price of your convinience";
  const buttonStyle =
    "bg-blue-500 mx-auto p-2 rounded-sm text-white font-bold mt-2";

  return (
    <div>
      <Navbar />
      <p className="italic text-2xl text-center font-bold w-3/5 mx-auto mb-10">
        "{descriptionOfPage}"
      </p>
      {session ? (
        <div className="flex flex-col items-center">
          please select your purpose:
          <div className="flex border border-black justify-center w-2/5 mt-3">
            {" "}
            <button
              className="bg-green-500 p-2 m-2 text-white"
              onClick={() => {
                setWantsToBuy(false);
                setShowForm(true);
              }}
            >
              I want to sell
            </button>
            <button
              className="bg-red-500 p-2 m-2 text-white"
              onClick={() => {
                setShowForm(false);

                setWantsToBuy(true);
              }}
            >
              I want to buy
            </button>
          </div>
          {!wantsToBuy && showForm && (
            <div>
              <form
                onSubmit={handleSubmit}
                className="border border-black m-2 p-2 flex flex-col h-72 justify-evenly"
              >
                <input
                  type="text"
                  placeholder="Enter the name of Product"
                  value={nameOfProduct}
                  onChange={(e) => {
                    setNameOfProduct(e.target.value);
                  }}
                  required
                />
                <textarea
                  className="border border-black p-1"
                  placeholder="Enter the description of Product"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <input
                  type="file"
                  placeholder="Upload the image"
                  required
                  // value={imageOfProduct}
                />
                <input
                  type="submit"
                  className="border border-black hover:shadow-md rounded-lg"
                  value="Submit"
                />
              </form>

              {progress !== "" && (
                <div className="mt-20">
                  <Progress_bar
                    bgcolor="#ff00ff"
                    progress={progress}
                    height={30}
                  />
                </div>
              )}
            </div>
          )}
          {wantsToBuy && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-4/5 mx-auto">
              {productsList.map((product, index) => (
                <Stationary_Card stationary={product} key={index} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <button onClick={signIn} className={buttonStyle}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Stationaries;
