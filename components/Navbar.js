import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();

  React.useEffect(() => {
    // console.log(session?.user);
  }, [session]);

  const handleSignUp = () => {
    signIn().then((response) => {
      console.log(response);
    });
  };
  const buttonStyle =
    "mr-2 border border-white hover:bg-white hover:text-black cursor-pointer font-semibold rounded-sm px-2 py-1";
  return (
    <div className="bg-black">
      <div className="h-16 w-4/5 mx-auto text-white shadow-md flex items-center justify-between">
        <a href="/" className="mx-2 font-bold text-3xl cursor-pointer">
          Home
        </a>
        {!session ? (
          <div className="flex mr-2">
            <p className={buttonStyle} onClick={signIn}>
              Login
            </p>
            <p className={buttonStyle} onClick={handleSignUp}>
              Sign-up
            </p>
          </div>
        ) : (
          <div className="flex mr-2 items-center">
            <img src={session.user.image} className="rounded-full mr-2 h-10" />
            <p className={buttonStyle} onClick={signOut}>
              Sign-out
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
