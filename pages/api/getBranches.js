export default function handler(req, res) {
 const subjects = [
   { name: "Computer Science and Engineering", code: "cse" },
   { name: "Electronics Engineering", code: "ece" },
   { name: "Electrical Engineering", code: "ee" },
   { name: "Mechanical Engineering", code: "me" },
   { name: "Civil Engineering", code: "ce" },
   { name: "Chemical Engineering", code: "che" },
   { name: "Physics", code: "phy" },
   { name: "Mathematics", code: "math" },
   { name: "Chemistry", code: "chem" },
 ];
  res.status(200).json(subjects);
}
