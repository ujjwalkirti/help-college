import React from "react";

function ReviewsCard({ entity, type }) {
  const buttonStyle =
    "bg-blue-500 text-white text-center font-semibold rounded-md hover:bg-white hover:text-blue-500 p-2 mt-2 border border-blue-500";
  if (type === "dormitories") {
    return (
      <div className="p-4 border border-black m-3">
        <h1 className="text-center font-bold text-2xl mb-3">
          {entity.hostel_name}
        </h1>
        <img src={entity.hostel_image} className="mx-auto h-72" />
        <div className="flex flex-col">
          <a
            href={`/read_reviews/hostel/${entity.hostel_code}`}
            className={buttonStyle}
          >
            Read Reviews
          </a>
          <a
            href={`/give_reviews/hostel/${entity.hostel_code}`}
            className={buttonStyle}
          >
            Add a Review
          </a>
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
          <a
            href={`/read_reviews/student_chapter/${entity.student_chapter_code}`}
            className={buttonStyle}
          >
            Read Reviews
          </a>
          <a
            href={`/give_reviews/student_chapter/${entity.student_chapter_code}`}
            className={buttonStyle}
          >
            Add a Review
          </a>
        </div>
      </div>
    );
  }
}

export default ReviewsCard;
