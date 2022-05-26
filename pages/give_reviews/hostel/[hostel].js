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

const MakeHostelReview = () => {
  const { data: session } = useSession();

  const [target_hostel, setTarget_hostel] = react.useState({});
  const [name, setName] = react.useState("");
  const [review, setReview] = react.useState("");

  const router = useRouter();

  const { hostel } = router.query;

  react.useEffect(() => {
    const reviewsRef = collection(db, "hostel");
    if (hostel) {
      const q = query(reviewsRef, where("hostel_code", "==", hostel));
      console.log(q);
      onSnapshot(q, (snapshot) => {
        let shots = [];
        snapshot.docs.forEach((doc) => {
          shots.push({ ...doc.data(), id: doc.id });
        });
        console.log(shots);
        setTarget_hostel(shots[0]);
      });
    }
  }, [hostel]);

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
      code: hostel,
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

    const backgroundStyle = {
      backgroundImage: "url('../../wallpapers/6.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    };


  return (
    <div className="min-h-screen text-white" style={backgroundStyle}>
      <Navbar />
      <img
        src={target_hostel.hostel_image}
        className="mx-auto rounded-lg mt-4 h-52 md:w-52"
      />
      <p className="text-center text-2xl font-bold italic mt-4">
        {target_hostel.hostel_name}
      </p>
      {typeof session !== "undefined" && session?.user ? (
        <form
          className="flex flex-col md:w-3/5  items-center bg-gray-300 my-4 rounded-lg text-black mx-2 md:mx-auto"
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
            className="p-2 m-2 md:w-3/5 w-full"
            onChange={(e) => {
              setReview(e.target.value);
            }}
            placeholder={`What do you have to say about ${target_hostel.hostel_name}`}
            required
          ></textarea>
          <input
            type="submit"
            className="m-2 border border-black p-2 text-xl font-bold cursor-pointer hover:bg-black hover:text-white"
            placeholder="Submit"
          />
        </form>
      ) : (
        <div className="flex flex-col mt-10 bg-gray-300 md:w-2/5 md:mx-auto mb-4 mx-4 p-2 rounded-lg">
          <p className="text-center text-2xl">
            Please login in order to post your reviews
          </p>
          <button
            className="bg-blue-500 mx-auto my-5 text-xl text-white hover:shadow-lg rounded-lg px-2 w-40 "
            onClick={signIn}
          >
            Login
          </button>
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

export default MakeHostelReview;
