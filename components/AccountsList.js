import Link from "next/link";
import Client from "@helium/http";

const AccountsList = ({ accounts, account, activeAccount }) => {
  // console.log("accounts");
  // console.log(accounts);
  return (
    <div className="h-full bg-gray-300 w-1/3 flex flex-col p-5 overflow-y-scroll">
      <p className="font-bold text-3xl">Accounts</p>
      <ul>
        {activeAccount && (
          <li
            className={`p-2 rounded-sm ${
              true
                ? "bg-purple-300 text-white"
                : "bg-purple-100 text-purple-500"
            } hover:bg-purple-200 mb-5`}
          >
            {account.address}
          </li>
        )}
        {accounts?.map((account, index) => {
          return (
            <Link href={`/accounts/${account.address}`}>
              <a className="">
                <li
                  className={`p-2 rounded-sm ${
                    account.address === activeAccount
                      ? "bg-purple-300 text-white"
                      : "bg-purple-100 text-purple-500"
                  } hover:bg-purple-200`}
                >
                  {account.address}
                </li>
              </a>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default AccountsList;
