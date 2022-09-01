import Image from "next/image";
import React from "react";

function ReviewsCard({ entity, type }) {
  const buttonStyle =
    "bg-white border border-red-500 hover:shadow-lg text-red-500 font-bold mx-auto mt-2 text-2xl text-white hover:shadow-lg rounded-lg px-2 py-3 transition ease-in-out delay-110 hover:text-white hover:bg-red-500 hover:scale-110";
  if (type === "dormitories") {
    return (
      <div className="p-4 bg-white rounded-xl m-3">
       
        <h1 className="text-center font-bold h-10 text-2xl mb-3">
          {entity.hostel_name}
        </h1>
        <Image
          height={300}
          width={400}
          layout="responsive"
          src={entity.hostel_image}
        />
        <div className="flex justify-center">
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
      <div className="p-4 bg-white rounded-xl m-3">
        <h1 className="text-center h-20 font-bold text-2xl mb-3">
          {entity.student_chapter_name}
        </h1>
        <Image
          height={300}
          width={400}
          layout="responsive"
          src={entity.student_chapter_image}
        />
        <div className="flex justify-center">
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
