import React from "react";
import { app } from "../components/Firebase/Firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import Progress_bar from "../components/Progress_bar";

function Stationaries() {
  const [wantsToBuy, setWantsToBuy] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [progress, setProgress] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[1].files[0];
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
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(prog);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  }

  return (
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

            setWantsToBuy(false);
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
              required
            />
            <input type="file" placeholder="Upload the image" required />
            <input
              type="submit"
              className="border border-black hover:shadow-md rounded-lg"
              value="Please submit"
            />
          </form>

          {progress !== "" && (
            <div className="mt-20">
              <Progress_bar bgcolor="#ff00ff" progress={progress} height={30} />
            </div>
          )}
        </div>
      )}
      {wantsToBuy && <div></div>}
    </div>
  );
}

export default Stationaries;
