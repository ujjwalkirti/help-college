import { useRouter } from "next/router";
import react from "react";
import Navbar from "../../../components/Navbar";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../components/Firebase/Firebase";
import ReadReview from "../../../components/ReadReview";

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
    <div className="text-black">
      {" "}
      <Navbar />
      <div className="flex flex-col p-4 md:flex-row md:w-3/5 mx-auto md:justify-between items-center">
        <p className="md:text-5xl sm:text-3xl mb-4 italic font-bold">
          {target_hostel.hostel_name}
        </p>
        <img src={target_hostel.hostel_image} className="h-72 w-72" />
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
          <p className="text-center md:text-2xl">
            sorry no reviews have been made! 📜
          </p>
        </div>
      )}
    </div>
  );
};

export default MakeHostelReview;
