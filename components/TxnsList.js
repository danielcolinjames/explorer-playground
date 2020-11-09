import Link from "next/link";

const TxnsList = ({ txns, activeTxn }) => {
  return (
    <ul>
      {txns?.data.map((txn, index) => {
        return (
          <Link href={`/txns/${txn.hash}`}>
            <a className="">
              <li
                className={`p-2 rounded-sm ${
                  txn.hash === activeTxn
                    ? "bg-purple-300 text-white"
                    : "bg-purple-100 text-purple-500"
                } hover:bg-purple-200`}
              >
                <span
                  className={`h-2 w-2 px-2 mr-2 ${
                    txn.type === "poc_request_v1"
                      ? "bg-green-500"
                      : txn.type === "poc_receipts_v1"
                      ? "bg-blue-500"
                      : txn.type === "other"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                />
                {txn.type === "poc_request_v1"
                  ? "PoC Challenge"
                  : txn.type === "poc_receipts_v1"
                  ? "PoC Receipt"
                  : txn.type}{" "}
                {txn.time}
              </li>
            </a>
          </Link>
        );
      })}
    </ul>
  );
};

export default TxnsList;
