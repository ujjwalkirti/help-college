import React from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "../../components/Firebase/Firebase";
import Progress_bar from "../../components/Progress_bar";
import Navbar from "../../components/Navbar";

function UploadCalender() {
  const [progress, setProgress] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target[0].files[0];
    if (app) uploadFile(file);
  };

  function uploadFile(file) {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, `/academic_calender/${file.name}`);
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

            setDoc(doc(db, "academic_calender", "current"), {
              name: "academic calender",
              imageUrl: downloadURL,
            })
              .then((doc) => {
                alert("Your academic calender uploaded successfully");
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

  const buttonStyle =
    "bg-blue-500 mx-auto p-2 rounded-sm text-white font-bold mt-2 cursor-pointer hover:shadow-lg";
  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-2/5 mx-auto h-screen items-center justify-center ">
        {" "}
        <form onSubmit={handleSubmit} className="border border-black p-2">
          <input type="file" required />
          <input type="submit" className={buttonStyle} />
        </form>
      </div>
      {progress !== "" && (
        <div className="mt-20">
          <Progress_bar bgcolor="#ff00ff" progress={progress} height={30} />
        </div>
      )}
    </div>
  );
}

export default UploadCalender;
