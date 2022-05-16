import { useRouter } from "next/router";
import react from "react";
import Navbar from "../../../components/Navbar";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../components/Firebase/Firebase";

const Post = () => {
  const [reviews, setReviews] = react.useState([]);
  const router = useRouter();
  const { student_chapter } = router.query;
  react.useEffect(() => {
    const reviewsRef = collection(db, "reviews");
    if (student_chapter) {
      const q = query(reviewsRef, where("code", "==", student_chapter));
    }
  }, [student_chapter]);

  return (
    <div>
      <Navbar /> {student_chapter}
    </div>
  );
};

export default Post;
