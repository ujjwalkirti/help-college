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
const { v4: uuidv4 } = require("uuid");

function Commute() {
  const [wantsToBuy, setWantsToBuy] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [nameOfProduct, setNameOfProduct] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [productsList, setProductList] = React.useState([]);
  const [ownerOfProduct, setOwnerOfProduct] = React.useState("");
  const [progress, setProgress] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState("");

  const { data: session } = useSession();

  React.useEffect(() => {
    if (wantsToBuy) {
      if (productsList !== []) {
        axios
          .get("/api/getVehicles")
          .then(function (response) {
            // handle success
            // console.log(response.data);
            if (response.data !== []) {
              setProductList(response.data);
            } else {
              alert("No Items available for sale");
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
    const storageRef = ref(storage, `/files/vehicles/${file.name}`);
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

            const id = uuidv4();

            addDoc(collection(db, "vehicles"), {
              name: nameOfProduct,
              description: description,
              owner: session.user.email,
              uid: id,
              ownerName:
                ownerOfProduct === "" ? session.user.name : ownerOfProduct,
              contact: contactNumber,
              image: downloadURL,
            })
              .then((doc) => {
                setNameOfProduct("");
                alert("Your Vehicle uploaded successfully");
                setOwnerOfProduct("");
                setDescription("");
                setProgress(0);
                setContactNumber("");
              })
              .catch((e) => {
                alert(e.message);
              });
          }
        });
      }
    );
  }

  const buttonStyle =
    "bg-blue-500 mx-auto p-2 rounded-sm text-white font-bold mt-2";
  const descriptionOfPage =
    "Are you looking forward to sell your bike, or buy a new one? Then this is the perfect place for you!";
  return (
    <div>
      <Navbar />
      <p className="italic text-2xl text-center font-bold p-2 md:w-3/5 mx-auto mb-10">
        "{descriptionOfPage}"
      </p>
      {session ? (
        <div className="flex flex-col items-center">
          please select your purpose:
          <div className="flex border border-black justify-center md:w-2/5 mt-3">
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
                className="border border-black m-2 p-2 flex flex-col justify-evenly"
              >
                <input
                  type="text"
                  placeholder="Enter the name of Vehicle"
                  value={nameOfProduct}
                  onChange={(e) => {
                    setNameOfProduct(e.target.value);
                  }}
                  required
                  className="mb-2"
                />
                <textarea
                  className="border border-black p-1"
                  placeholder="Enter the description of Vehicle"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <input
                  type="file"
                  placeholder="Upload the image"
                  required
                  className="my-2"
                  // value={imageOfProduct}
                />
                <input
                  type="text"
                  placeholder="Mention your name"
                  value={ownerOfProduct}
                  onChange={(e) => {
                    setOwnerOfProduct(e.target.value);
                  }}
                />
                <ul className="text-green-600 my-4">
                  <li>
                    Don't feel the obligation to mention your name here, it will
                    be automatically recorded from your signed-in email.
                  </li>
                  <li>
                    If you mention your name, we will accept it in place of the
                    one from your email.
                  </li>
                </ul>
                <input
                  type="tel"
                  placeholder="Enter your contact number"
                  required
                  className="my-2"
                  value={contactNumber}
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                  }}
                />
                <input
                  type="submit"
                  className="border w-3/5 mx-auto cursor-pointer border-black hover:shadow-md rounded-lg hover:bg-black hover:text-white"
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
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto">
                {productsList.map((product, index) => (
                  <Stationary_Card
                    stationary={product}
                    entity="vehicle"
                    key={index}
                  />
                ))}
              </div>
              {productsList.length === 0 && (
                <div className="mt-10">
                  <p className="text-2xl text-center italic w-screen">
                    Sorry, but the marketplace seems empty.
                  </p>
                  <img src="sold-out.jpg" className="h-36 w-36 mx-auto" />
                </div>
              )}
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

export default Commute;
