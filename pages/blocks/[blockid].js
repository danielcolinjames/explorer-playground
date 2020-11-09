import Client from "@helium/http";
import Link from "next/link";
import BlocksList from "../../components/BlocksList";
import TxnsList from "../../components/TxnsList";

const BlockDetailView = ({ blocks, block, txns }) => {
  const height = block?.height ? block.height : "Loading...";

  return (
    <main className="p-6 bg-purple-800 h-screen flex flex-row">
      <BlocksList blocks={blocks} activeBlock={block.height} />
      <div className="h-full bg-gray-200 w-1/3 flex p-5 flex-col overflow-y-scroll">
        <h3 className="text-3xl font-bold">Block {height}</h3>
        <p className="text-purple-800">
          Transactions: {block.transactionCount}
        </p>
        <p className="text-purple-800">Time: {block.time}</p>
        <TxnsList txns={txns} />
      </div>
      {/* {console.log(txns)} */}
      <div className="h-full bg-gray-100 w-1/3 flex p-5"></div>
    </main>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const client = new Client();
  const { blockid } = params;
  const blocks = await client.blocks.list();

  const block = await client.blocks.get(blockid);
  const txns = await block.transactions.list();
  // console.log(txns);

  return {
    props: {
      block: JSON.parse(JSON.stringify(block)),
      blocks: JSON.parse(JSON.stringify(blocks)),
      txns: JSON.parse(JSON.stringify(txns)),
    },
    revalidate: 10,
  };
}

export default BlockDetailView;
