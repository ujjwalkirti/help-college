import { useRouter } from "next/router";
import react from "react";
import Navbar from "../../../components/Navbar";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../components/Firebase/Firebase";
import ReadReview from "../../../components/ReadReview";

const Post = () => {
  const [reviews, setReviews] = react.useState([]);
  const [target_chapter, setTarget_chapter] = react.useState({});
  const [noReviewsPresent, setNoReviewsPresent] = react.useState(false);

  const router = useRouter();

  const { student_chapter } = router.query;

  react.useEffect(() => {
    const reviewsRef = collection(db, "reviews");
    const studentChaptersRef = collection(db, "student_chapter");
    if (student_chapter) {
      const q = query(reviewsRef, where("code", "==", student_chapter));
      const p = query(
        studentChaptersRef,
        where("student_chapter_code", "==", student_chapter)
      );
      onSnapshot(p, (student_chapter) => {
        let data = [];
        student_chapter.docs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setTarget_chapter(data[0]);
      });
      onSnapshot(q, (snapshot) => {
        let shots = [];
        snapshot.docs.forEach((doc) => {
          shots.push({ ...doc.data(), id: doc.id });
        });
        console.log(shots);
        setReviews(shots);

        if (shots.length === 0) setNoReviewsPresent(true);
      });
    }
  }, [student_chapter]);
  const backgroundStyle = {
    backgroundImage: "url('../../wallpapers/9.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };


  return (
    <div className="min-h-screen" style={backgroundStyle}>
      <Navbar />
      <div className="flex flex-col p-4 md:flex-row md:w-3/5 mx-auto md:justify-between items-center">
        <p className="md:text-5xl sm:text-3xl mb-4 italic font-bold text-white">
          {target_chapter.student_chapter_name}
        </p>
        <img src={target_chapter.student_chapter_image} className="h-72 w-72" />
      </div>
      {!noReviewsPresent ? (
        <div>
          {reviews.map((review) => {
            return (
              <div className="md:w-3/5 mx-auto">
                <ReadReview entity={review} type="student_chapter" />
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

export default Post;
