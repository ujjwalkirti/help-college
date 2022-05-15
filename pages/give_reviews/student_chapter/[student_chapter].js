import { useRouter } from "next/router";
import react from "react";

const Post = () => {
  const router = useRouter();
  const { student_chapter } = router.query;

  react.useEffect(() => {}, [student_chapter]);

  return <p> {student_chapter}</p>;
};

export default Post;
