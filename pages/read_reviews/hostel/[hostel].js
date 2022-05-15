import { useRouter } from "next/router";
import react from "react";

const MakeHostelReview = () => {
  const router = useRouter();

  const { hostel } = router.query;

  react.useEffect(() => {}, [hostel]);

  return <div className="text-black">{hostel}</div>;
};

export default MakeHostelReview;
