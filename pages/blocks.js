import Link from "next/link";
import Client from "@helium/http";
import BlocksList from "../components/BlocksList";

const Blocks = ({ blocks }) => {
  return (
    <main className="p-6 bg-purple-800 h-screen flex flex-row">
      <BlocksList blocks={blocks} />
      <div className="h-full bg-gray-200 w-1/3 flex p-5"></div>
      <div className="h-full bg-gray-100 w-1/3 flex p-5"></div>
    </main>
  );
};

export async function getStaticProps({ params }) {
  const client = new Client();
  // const { hotspotid } = params
  const blocks = await client.blocks.list();
  // console.log(blocks);
  // console.log("hello");

  // const hotspot = await client.hotspots.get(hotspotid)

  return {
    props: {
      blocks: JSON.parse(JSON.stringify(blocks)),
    },
    revalidate: 10,
  };
}

export default Blocks;
