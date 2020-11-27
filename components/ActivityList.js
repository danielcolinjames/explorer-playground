import Link from "next/link";
import animalHash from "angry-purple-tiger";

const ActivityList = ({ activities }) => {
  return (
    <div className="h-full bg-gray-200 w-1/3 flex p-5 flex-col overflow-y-scroll">
      <ul>
        <h3 className="text-3xl font-bold">Activity:</h3>
        <p className="text-purple-800">{/* {block.transactionCount} */}</p>
        {activities?.map((activity, index) => {
          return (
            <Link href={`/txns/${activity.hash}`}>
              <a className="">
                <li
                  className={`p-2 rounded-sm bg-purple-100 text-purple-500 hover:bg-purple-200`}
                >
                  {activity.type}
                  {/* <span
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
                {txn.time} */}
                </li>
              </a>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityList;
