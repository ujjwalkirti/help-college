import Head from "next/head";
import Functionalities from "../components/Functionalities";
import Navbar from "../components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import react from "react";
import { getAnalytics } from "firebase/analytics";
import { app } from "../components/Firebase/Firebase";
import SuggestionBox from "../components/SuggestionBox";
import Footer from "../components/Footer";

export default function Home() {
  const { data: session } = useSession();

  react.useEffect(() => {
    const analytics = getAnalytics(app);
  }, []);

  // const backgroundStyle = {
  //   backgroundImage: "url('wallpapers/1.jpg')",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  // };

  return (
    <div className="bg-gradient-to-br from-red-400 to-yellow-300 min-h-screen">
      <Head>
        <title>Helping you through!</title>
        <meta
          name="description"
          content="Application developed by Ujjwal Kirti for students of SVNIT, Surat"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Functionalities />

      {session && (
        <div className="mt-2">
          <p className="text-center text-white">
            You are logged in as <strong>{session.user.name}</strong>
          </p>

          <SuggestionBox />
        </div>
      )}
      <Footer />
    </div>
  );
}
