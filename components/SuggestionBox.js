import { useSession } from "next-auth/react";
import React from "react";

const SuggestionBox = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-white px-2 py-1 mt-5 rounded-lg md:w-1/2 mx-2 md:mx-auto">
      {session && (
        <p className="font-semibold text-center">
          Do you have any suggestions or complaints? Report{" "}
          <a
            href="/suggestions"
            className="cursor-pointer hover:underline text-blue-600"
          >
            here
          </a>
        </p>
      )}
    </div>
  );
};

export default SuggestionBox;
