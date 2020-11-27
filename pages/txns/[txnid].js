import Link from "next/link";
import BlocksList from "../../components/BlocksList";
import TxnsList from "../../components/TxnsList";
import Client from "@helium/http";
import Timestamp from "react-timestamp";
import animalHash from "angry-purple-tiger";

const TxnDetailView = ({ blocks, block, txns, txn }) => {
  return (
    <main className="p-6 bg-purple-800 h-screen flex flex-row">
      <BlocksList
        blocks={blocks}
        activeBlock={block?.height ? block?.height : 0}
      />
      <div className="h-full bg-gray-200 w-1/3 flex p-5 flex-col overflow-y-scroll">
        <h3 className="text-3xl font-bold">Block {block?.height}</h3>
        <p className="text-purple-800">
          Transactions: {block?.transactionCount}
        </p>
        <p className="text-purple-800">Time: {block?.time}</p>
        <TxnsList txns={txns} activeTxn={txn.hash} />
      </div>
      {/* {console.log(txns)} */}
      <div className="h-full bg-gray-100 w-1/3 flex flex-col p-5 overflow-y-scroll">
        <h3 className="text-3xl font-bold">Transaction Details</h3>
        {/* {console.log(txn)} */}
        {txn.type === "poc_request_v1" ? (
          <>
            <h2 className="text-green-400">PoC Request</h2>
            <Timestamp className="font-bold" date={txn.time} />
            <p>Challenger:</p>
            <Link href={`/hotspots/${txn.challenger}`}>
              <a className="">{animalHash(txn.challenger)}</a>
            </Link>
            <p className="">Challenger Location: {txn.challengerLocation}</p>
            <p className="break-all pt-5">Other: {JSON.stringify(txn)}</p>
          </>
        ) : txn.type === "poc_receipts_v1" ? (
          <>
            <h2 className="text-blue-400">PoC Receipt</h2>
            <Timestamp className="font-bold" date={txn.time} />
            <p className="">Challenger:</p>
            <Link href={`/hotspots/${txn.challenger}`}>
              <a>{animalHash(txn.challenger)}</a>
            </Link>
            <p className="pt-5 font-bold">PoC Path:</p>
            <ul>
              {txn.path.map((segment, index) => {
                return (
                  <Link href={`/hotspots/${segment.challengee}`}>
                    <a className="text-purple-500 hover:text-purple-600">
                      <li
                        className={`p-2 rounded-sm bg-purple-100 text-purple-500 hover:bg-purple-200`}
                      >
                        {index + 1}. {animalHash(segment.challengee)}
                      </li>
                    </a>
                  </Link>
                );
              })}
            </ul>
            <p className="break-all pt-5">Other: {JSON.stringify(txn)}</p>
          </>
        ) : txn.type === "rewards_v1" ? (
          <>
            <h2>{txn.type}</h2>
            <p>Rewards: {txn.rewards.length}</p>
          </>
        ) : (
          <>
            <h2 className="text-gray-400">{txn.type}</h2>
            <p className="break-all">{JSON.stringify(txn)}</p>
          </>
        )}
      </div>
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
  const { txnid } = params;
  const blocks = await client.blocks.list();

  const txn = await client.transactions.get(txnid);
  const block = await client.blocks.get(txn.height);
  const txns = await block.transactions.list();
  // console.log(txn.height);

  // console.log(txns);

  return {
    props: {
      blocks: JSON.parse(JSON.stringify(blocks)),
      block: JSON.parse(JSON.stringify(block)),
      txns: JSON.parse(JSON.stringify(txns)),
      txn: JSON.parse(JSON.stringify(txn)),
    },
    revalidate: 10,
  };
}

export default TxnDetailView;
