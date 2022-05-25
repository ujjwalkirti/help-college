import React from "react";

const ReadReview = ({ entity, type }) => {
  return (
    <div className=" bg-gray-300 p-2 mt-2 rounded-lg mx-4">
      <p className="italic">{entity.author} - </p>
      <p className="font-semibold my-4">"{entity.review}"</p>
      <div className="flex justify-end">
        <p className="pr-2">{entity.date_time.n},</p>
        <p>{entity.date_time.time}</p>
      </div>
    </div>
  );
};

export default ReadReview;
