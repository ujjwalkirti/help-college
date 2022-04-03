import React from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { app, db } from "../../components/Firebase/Firebase";

const CreateStudentChapter = () => {
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");

  const { data: session } = useSession();

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[2].files[0];
    // console.log(e.target[1]);
    if (app) uploadFile(file);
  };

  function uploadFile(file) {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, `/files/student_chapters/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(prog);
      },
      (err) => {
        console.log(err);
        alert(err.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          {
            // console.log("File available at", downloadURL);

            addDoc(collection(db, "student_chapter"), {
              student_chapter_name: name,
              student_chapter_code: code,
              owner: session.user.email,
              student_chapter_image: downloadURL,
            })
              .then((doc) => {
                alert("Your student chapter uploaded successfully");
                setName("");
                setCode("");
              })
              .catch((e) => {
                alert(e.message);
              });
          }
        });
      }
    );
  }
  return (
    <div>
      <p className="text-center font-bold text-5xl m-4">
        Form to add a Student Chapter
      </p>
      <form
        onSubmit={handleSubmit}
        className="border flex flex-col border-black w-2/5 mx-auto p-2"
      >
        <input
          type="text"
          placeholder="Enter Student Chapter Name"
          required
          value={name}
          className="p-2"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          required
          placeholder="Enter the code for Student Chapter"
          className="p-2"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
        <input type="file" required className="p-2" />
        <input
          type="submit"
          className="bg-black border border-black text-white w-2/5 mx-auto font-semibold rounded-lg p-2 text-xl hover:bg-white hover:text-black cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreateStudentChapter;
