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
import Image from "next/image";

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
  // const backgroundStyle = {
  //   backgroundImage: "url('../../wallpapers/8.jpg')",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  //   backgroundAttachment: "fixed",
  // };

  const buttonStyle =
    "bg-white border border-red-500 hover:shadow-lg text-red-500 font-bold mx-auto my-5 text-3xl text-white hover:shadow-lg rounded-lg px-2 py-3 w-40 transition ease-in-out delay-150 hover:scale-110";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex justify-center mt-4">
        <Image
          width={300}
          height={250}
          src={target_chapter.student_chapter_image}
        />
      </div>
      <p className="text-center text-2xl text-white font-bold italic mt-4">
        {target_chapter.student_chapter_name}
      </p>
      {typeof session !== "undefined" && session?.user ? (
        <form
          className="flex flex-col bg-gradient-to-br from-red-300 to-yellow-400 mx-1 px-2 md:w-3/5 md:mx-auto items-center my-4 rounded-lg"
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
            className="p-2 m-2 w-full md:w-3/5"
            onChange={(e) => {
              setReview(e.target.value);
            }}
            placeholder={`What do you have to say about ${target_chapter.student_chapter_name}`}
            required
          ></textarea>
          <input
            type="submit"
            className={buttonStyle}
            placeholder="Submit"
          />
        </form>
      ) : (
        <div className="flex flex-col mt-10 md:w-2/5 md:mx-auto mb-4 mx-4 p-2 rounded-lg">
          <p className="text-center text-4xl font-semibold animate-pulse">
            Please login in order to post your reviews
          </p>
          <button
            className={buttonStyle}
            onClick={signIn}
          >
            Login
          </button>
        </div>
      )}
      <p className="text-center font-semibold text-2xl">
        <strong>Note</strong>: The reviews you post here will be automatically
        be posted, however it will be checked for authenticity of claims and
        other relevant factors by authorities later on.{" "}
      </p>
    </div>
  );
};

export default Post;
