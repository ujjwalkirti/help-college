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
import Head from "next/head";

const MakeHostelReview = () => {
  const { data: session } = useSession();

  const [target_hostel, setTarget_hostel] = react.useState({});
  const [name, setName] = react.useState("");
  const [review, setReview] = react.useState("");

  const router = useRouter();

  const { hostel } = router.query;
  console.log(router);

  react.useEffect(() => {
    const reviewsRef = collection(db, "hostel");
    if (hostel) {
      const q = query(reviewsRef, where("hostel_code", "==", hostel));
      
      onSnapshot(q, (snapshot) => {
        let shots = [];
        snapshot.docs.forEach((doc) => {
          shots.push({ ...doc.data(), id: doc.id });
        });
        
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

  // const backgroundStyle = {
  //   backgroundImage: "url('../../wallpapers/6.jpg')",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  //   backgroundAttachment: "fixed",
  // };

  const buttonStyle =
    "bg-white border border-red-500 hover:shadow-lg text-red-500 font-bold mx-auto my-2 text-3xl text-white hover:shadow-lg rounded-lg px-1 py-2 w-40 transition ease-in-out delay-150 hover:scale-110 hover:bg-red-500 hover:text-white cursor-pointer";

  return (
    <div className="min-h-screen">
      <Head>
        <title>Give reviews - {target_hostel.hostel_name}</title>
      </Head>
      <Navbar />
      <div className="flex flex-col md:w-3/5 mx-auto md:mt-2 items-center px-2 justify-center">
        <p className="lg:text-5xl md:absolute z-30 text-xl  md:text-red-500 px-2 py-1 rounded-sm md:text-2xl bg-white font-bold">
          {target_hostel.hostel_name}
        </p>
        <Image
          width={1000}
          height={500}
          layout="intrinsic"
          src={target_hostel.hostel_image}
        />
      </div>
      {typeof session !== "undefined" && session?.user ? (
        <form
          className="flex flex-col  bg-gradient-to-br from-red-300 to-yellow-400 mx-1 px-2 md:w-3/5 md:mx-auto items-center my-4 rounded-lg"
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
            className="p-2 m-2 border-none md:w-4/5"
          />
          <textarea
            value={review}
            className="p-2 m-2 md:w-4/5 w-full"
            onChange={(e) => {
              setReview(e.target.value);
            }}
            placeholder={`What do you have to say about ${target_hostel.hostel_name}`}
            required
          ></textarea>
          <input type="submit" className={buttonStyle} placeholder="Submit" />
        </form>
      ) : (
        <div className="flex flex-col  md:w-2/5 md:mx-auto mx-4 p-2 rounded-lg">
          <p className="text-center text-3xl font-semibold animate-pulse">
            Please login in order to post your reviews
          </p>
          <button className={buttonStyle} onClick={signIn}>
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

export default MakeHostelReview;
