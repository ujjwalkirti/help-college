import { collection, getDocs } from "firebase/firestore";
import { db } from "../../components/Firebase/Firebase";

export default async function handler(req, res) {
  const values = await getDocs(collection(db, "student_chapters"));
  let items = [];
  values.forEach((value) => items.push(value.data()));

  res.status(200).json(items);
}
