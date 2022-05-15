import React from "react";

function ReviewsCard({ entity, type }) {
  const buttonStyle =
    "bg-blue-500 text-white font-semibold rounded-md hover:bg-white hover:text-blue-500 p-2 mt-2 border border-blue-500";
  if (type === "dormitories") {
    return (
      <div className="p-4 border border-black m-3">
        <h1 className="text-center font-bold text-2xl mb-3">
          {entity.hostel_name}
        </h1>
        <img src={entity.hostel_image} className="mx-auto h-72" />
        <div className="flex flex-col">
          <button className={buttonStyle}>Read Reviews</button>
          <button className={buttonStyle}>Add a Review</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-4 border border-black m-3">
        <h1 className="text-center font-bold text-2xl mb-3">
          {entity.student_chapter_name}
        </h1>
        <img src={entity.student_chapter_image} className="mx-auto h-72" />
        <div className="flex flex-col">
          <button className={buttonStyle}>Read Reviews</button>
          <button className={buttonStyle}>Add a Review</button>
        </div>
      </div>
    );
  }
}

export default ReviewsCard;
