import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { student_chapter } = router.query;

  return <p> {student_chapter}</p>;
};

export default Post;
