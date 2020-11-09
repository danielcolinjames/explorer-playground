import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-5 bg-purple-800 h-screen">
        <h1 className="p-5 text-white text-6xl font-normal">
          Helium <span className="font-bold">Explorer</span>
        </h1>

        <div className="flex flex-row">
          <Link href="/blocks">
            <a className="m-5 w-1/2 no-underline	p-6 border border-white rounded-lg hover:border-gray-500">
              <h3 className="text-white text-3xl">Blocks &rarr;</h3>
              <p className="text-gray-500">View blocks</p>
            </a>
          </Link>
          <Link href="/hotspots">
            <a className="m-5 w-1/2 no-underline	p-6 border border-white rounded-lg hover:border-gray-500">
              <h3 className="text-white text-3xl">Hotspots &rarr;</h3>
              <p className="text-gray-500">View hotspots & accounts</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
