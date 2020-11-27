import Client from "@helium/http";
import AccountsList from "../components/AccountsList";

const Accounts = ({ accounts }) => {
  return (
    <main className="p-6 bg-purple-800 h-screen flex flex-row">
      <AccountsList accounts={accounts} />
      <div className="h-full bg-gray-200 w-1/3 flex p-5"></div>
      <div className="h-full bg-gray-100 w-1/3 flex p-5"></div>
    </main>
  );
};

export async function getStaticProps({ params }) {
  const client = new Client();
  const accountsList = await client.accounts.list();
  const accounts = await accountsList.take(20);

  return {
    props: {
      accounts: JSON.parse(JSON.stringify(accounts)),
    },
    revalidate: 10,
  };
}

export default Accounts;
