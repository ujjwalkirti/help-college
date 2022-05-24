import { useRouter } from "next/router";
import react from "react";
import Navbar from "../../../components/Navbar";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../components/Firebase/Firebase";
import { signIn, useSession } from "next-auth/react";

const Post = () => {
  const { data: session } = useSession();

  const [target_chapter, setTarget_chapter] = react.useState({});
  const [name, setName] = react.useState("");
  const [review, setReview] = react.useState("");
  const router = useRouter();
  const { student_chapter } = router.query;

  react.useEffect(() => {
    const reviewsRef = collection(db, "student_chapter");
    if (student_chapter) {
      const q = query(
        reviewsRef,
        where("student_chapter_code", "==", student_chapter)
      );
      console.log(q);
      onSnapshot(q, (snapshot) => {
        let shots = [];
        snapshot.docs.forEach((doc) => {
          shots.push({ ...doc.data(), id: doc.id });
        });
        console.log(shots);
        setTarget_chapter(shots[0]);
      });
    }
  }, [student_chapter]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // get a new date (locale machine date time)
    var date = new Date();
    // get the date as a string
    var n = date.toDateString();
    // get the time as a string
    var time = date.toLocaleTimeString();

    addDoc(collection(db, "reviews"), {
      author: name,
      code: student_chapter,
      owner: session.user.email,
      date_time: { n, time },
      review: review,
    })
      .then((doc) => {
        alert("Your review has been submitted for publish.");
        setName("");
        setReview("");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <div>
      <Navbar />
      <img
        src={target_chapter.student_chapter_image}
        className="mx-auto rounded-lg mt-4 h-52 w-52"
      />
      <p className="text-center text-2xl font-bold italic mt-4">
        {target_chapter.student_chapter_name}
      </p>
      {typeof session !== "undefined" && session?.user ? (
        <form
          className="flex flex-col md:w-3/5 mx-auto items-center bg-gray-300 my-4 rounded-lg"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            className="p-2 m-2 border-none md:w-3/5"
          />
          <textarea
            value={review}
            className="p-2 m-2 md:w-3/5"
            onChange={(e) => {
              setReview(e.target.value);
            }}
            placeholder={`What do you have to say about ${target_chapter.student_chapter_name}`}
            required
          ></textarea>
          <input
            type="submit"
            className="m-2 border border-black p-2 text-xl font-bold cursor-pointer hover:bg-black hover:text-white"
            placeholder="Submit"
          />
        </form>
      ) : (
        <div className="flex flex-col mt-10">
          <p className="text-center">Please login in order to post your reviews</p>
          <button className="bg-blue-500 mx-auto my-5 text-xl text-white hover:shadow-lg rounded-lg px-2 w-40 " onClick={signIn}>Login</button>
        </div>
      )}
      <p className="text-center">
        <strong>Note</strong>: The reviews you post here will not automatically
        be posted, rather it will be checked for authenticity of claims and
        other relevant factors by authorities.{" "}
      </p>
    </div>
  );
};

export default Post;
