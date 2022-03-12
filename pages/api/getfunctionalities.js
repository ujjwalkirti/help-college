export default function handler(req, res) {
  const data = [
    {
      name: "Previous Year Questions",
      description: "",
      url: "/pyq",
      backgroundImg: "",
    },
    { name: "Academic Calender", description: "", backgroundImg: "", url: "" },
    {
      name: "Old Books and other Stationaries for sale",
      description: "",
      backgroundImg: "",
      url: "/stationaries",
    },
    {
      name: "Vehicles for sale",
      description: "",
      backgroundImg: "",
      url: "/commute",
    },
    {
      name: "Hostel and Student chapter reviews",
      description: "",
      backgroundImg: "",
      url: "/reviews",
    },
  ];
  res.status(200).json(data);
}
