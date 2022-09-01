import { useRouter } from "next/router";
import react from "react";
import Navbar from "../../../components/Navbar";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../components/Firebase/Firebase";
import ReadReview from "../../../components/ReadReview";
import Image from "next/image";

const MakeHostelReview = () => {
  const [reviews, setReviews] = react.useState([]);
  const [target_hostel, setTarget_hostel] = react.useState({});
  const [noReviewsPresent, setNoReviewsPresent] = react.useState(false);

  const router = useRouter();

  const { hostel } = router.query;

  react.useEffect(() => {
    const reviewsRef = collection(db, "reviews");
    const hostelRef = collection(db, "hostel");
    if (hostel) {
      const q = query(reviewsRef, where("code", "==", hostel));
      const p = query(hostelRef, where("hostel_code", "==", hostel));
      onSnapshot(p, (hostel) => {
        let data = [];
        hostel.docs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setTarget_hostel(data[0]);
      });
      onSnapshot(q, (snapshot) => {
        let shots = [];
        snapshot.docs.forEach((doc) => {
          shots.push({ ...doc.data(), id: doc.id });
        });
        // console.log(shots);
        setReviews(shots);
        if (shots.length === 0) setNoReviewsPresent(true);
      });
    }
  }, [hostel]);

  return (
    <div className="min-h-screen">
      {" "}
      <Navbar />
      <div className="flex md:w-3/5 mx-auto items-center justify-center">
        <p className="md:text-5xl md:absolute z-30 md:text-red-500 px-2 py-1 rounded-sm text-2xl bg-white font-bold">
          {target_hostel.hostel_name}
        </p>
        <Image
          width={1000}
          height={500}
          layout="intrinsic"
          src={target_hostel.hostel_image}
        />
      </div>
      {!noReviewsPresent ? (
        <div>
          {reviews.map((review) => {
            return (
              <div className="md:w-3/5 mx-auto">
                <ReadReview entity={review} type="hostel" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="">
          {" "}
          <p className="text-center text-2xl md:text-4xl">
            sorry no reviews have been made, yet! 📜
          </p>
        </div>
      )}
    </div>
  );
};

export default MakeHostelReview;
