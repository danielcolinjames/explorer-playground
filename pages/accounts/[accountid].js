import Client from "@helium/http";
import Link from "next/link";
import AccountsList from "../../components/AccountsList";
import HotspotsList from "../../components/HotspotsList";

const AccountDetailView = ({
  account,
  accountStats,
  accounts,
  accountHotspots,
}) => {
  // const height = block?.height ? block.height : "Loading...";

  console.log(account);
  console.log(accounts);
  console.log(accountStats);

  return (
    <main className="p-6 bg-purple-800 h-screen flex flex-row">
      <AccountsList
        account={account}
        accounts={accounts}
        activeAccount={account.address}
      />
      <div className="h-full bg-gray-200 w-1/3 flex p-5 flex-col overflow-y-scroll">
        <h3 className="text-3xl font-bold break-words">{account.address}</h3>
        <p className="text-purple-800">
          HNT Balance: {account.balance.floatBalance}
        </p>
        <p className="text-purple-800">
          Hotspots ({accountHotspots.data.length}):{" "}
        </p>
        <HotspotsList hotspots={accountHotspots} />
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
  const { accountid } = params;
  const account = await client.accounts.get(accountid);
  const accountStats = await client.accounts.getStats(accountid);

  // const block = await client.blocks.get(blockid);
  const accountsList = await client.accounts.list();
  const accounts = await accountsList.take(20);

  const accountHotspots = await client.account(accountid).hotspots.list();

  return {
    props: {
      account: JSON.parse(JSON.stringify(account)),
      accountStats: JSON.parse(JSON.stringify(accountStats)),
      accounts: JSON.parse(JSON.stringify(accounts)),
      accountHotspots: JSON.parse(JSON.stringify(accountHotspots)),
    },
    revalidate: 10,
  };
}

export default AccountDetailView;
