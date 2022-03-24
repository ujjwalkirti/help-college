// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const data = ["2018-19", "2019-20", "2020-21", "2021-22"];

export default function handler(req, res) {
  res.status(200).json(data);
}
