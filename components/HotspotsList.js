import Link from "next/link";
import animalHash from "angry-purple-tiger";

const HotspotsList = ({ hotspots, activeHotspot }) => {
  return (
    <ul>
      {hotspots?.data.map((hotspot, index) => {
        return (
          <Link href={`/hotspots/${hotspot.address}`}>
            <a className="">
              <li
                className={`p-2 rounded-sm ${
                  hotspot.address === activeHotspot
                    ? "bg-purple-300 text-white"
                    : "bg-purple-100 text-purple-500"
                } hover:bg-purple-200`}
              >
                {hotspot.name}
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
  );
};

export default HotspotsList;
