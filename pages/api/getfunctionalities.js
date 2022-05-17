import { doc, getDoc } from "firebase/firestore";
import { db } from "../../components/Firebase/Firebase";

export default function handler(req, res) {
  let calender_url = "";
  let data = [];
  function getter() {
    const docRef = doc(db, "academic_calender", "current");
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          calender_url = docSnap.data().imageUrl;
          data = [
            {
              name: "Previous Year Questions",
              url: "/pyq",
              backgroundImg: "",
              emoji: "❓",
            },
            {
              name: "Academic Calender",
              description: "Academic calender for the academic year 2021-22",
              backgroundImg: "",
              url: calender_url,
              emoji: "📆",
            },
            {
              name: "Old Books and other Stationaries for sale",
              emoji: "📚",
              backgroundImg: "",
              url: "/stationaries",
            },
            {
              name: "Vehicles for sale",
              emoji: "🏍️",
              backgroundImg: "",
              url: "/commute",
            },
            {
              name: "Hostel and Student chapter reviews",
              emoji: "🏨",
              backgroundImg: "",
              url: "/reviews",
            },
          ];

          res.status(200).json(data);

          // console.log(calender_url);
        } else {
          // doc.data() will be undefined in this case
        }
      })
      .catch(() => {
        console.log("process failed");
      });
  }

  getter();
}
