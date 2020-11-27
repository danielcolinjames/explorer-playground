import Client from "@helium/http";
import Link from "next/link";
import HotspotsList from "../../components/HotspotsList";
import AccountsList from "../../components/AccountsList";
import ActivityList from "../../components/ActivityList";

const HotspotDetailView = ({
  hotspot,
  hotspotActivity,
  account,
  accountStats,
  accountHotspots,
  accounts,
}) => {
  // const height = block?.height ? block.height : "Loading...";
  console.log(hotspot);
  console.log(hotspotActivity);
  console.log(account);
  console.log(accounts);
  console.log(accountHotspots);

  return (
    <main className="p-6 bg-purple-800 h-screen flex flex-row">
      <AccountsList
        accounts={accounts}
        account={account}
        activeAccount={hotspot.owner}
      />
      <div className="h-full bg-gray-200 w-1/3 flex p-5 flex-col overflow-y-scroll">
        <h3 className="text-3xl font-bold break-words">{account.address}</h3>
        <p className="text-purple-800">
          HNT Balance: {account.balance.floatBalance}
        </p>
        <p className="text-purple-800">
          Hotspots ({accountHotspots.data.length}):{" "}
        </p>
        <HotspotsList
          hotspots={accountHotspots}
          activeHotspot={hotspot.address}
        />
      </div>
      <ActivityList activities={hotspotActivity} />
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
  const { hotspotid } = params;
  // const blocks = await client.blocks.list();

  // const block = await client.blocks.get(blockid);
  // const txns = await block.transactions.list();
  // console.log(txns);

  const hotspot = await client.hotspots.get(hotspotid);
  const hotspotActivityList = await client.hotspot(hotspotid).activity.list();
  const hotspotActivity = await hotspotActivityList.take(20);

  const account = await client.accounts.get(hotspot.owner);
  const accountStats = await client.accounts.getStats(hotspot.owner);

  const accountsList = await client.accounts.list();
  const accounts = await accountsList.take(20);

  const accountHotspots = await client.account(hotspot.owner).hotspots.list();

  return {
    props: {
      hotspot: JSON.parse(JSON.stringify(hotspot)),
      hotspotActivity: JSON.parse(JSON.stringify(hotspotActivity)),
      account: JSON.parse(JSON.stringify(account)),
      accountStats: JSON.parse(JSON.stringify(accountStats)),
      accounts: JSON.parse(JSON.stringify(accounts)),
      accountHotspots: JSON.parse(JSON.stringify(accountHotspots)),
    },
    revalidate: 10,
  };
}

export default HotspotDetailView;
