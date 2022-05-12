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
              description:
                "You will get all the previous year question papers of mid semester and end semester examinations for all the branches here!",
              url: "/pyq",
              backgroundImg: "",
            },
            {
              name: "Academic Calender",
              description: "Academic calender for the academic year 2021-22",
              backgroundImg: "",
              url: calender_url,
            },
            {
              name: "Old Books and other Stationaries for sale",
              description:
                "This is the only place where you can sell and buy second-hand stationary items at price of your convinience",
              backgroundImg: "",
              url: "/stationaries",
            },
            {
              name: "Vehicles for sale",
              description:
                "Are you looking forward to sell your bike, or buy a new one? Then this is the perfect place for you!",
              backgroundImg: "",
              url: "/commute",
            },
            {
              name: "Hostel and Student chapter reviews",
              description:
                "SVNIT, Surat has a dozen of student chapters which makes it quite difficult for any newbie or fresher to decide which club or chapter is best suited for him. But worry no more, as here you will get to read about first hand reviews about not only student chapters and clubs but even hostels and other facilities provided by the institute. ",
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
