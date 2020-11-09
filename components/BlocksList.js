import Link from "next/link";
import Client from "@helium/http";

const BlocksList = ({ blocks, activeBlock }) => {
  return (
    <div className="h-full bg-gray-300 w-1/3 flex flex-col p-5 overflow-y-scroll">
      <p className="font-bold text-3xl">Blocks</p>
      <ul>
        {blocks?.data.map((block, index) => {
          return (
            <Link href={`/blocks/${block.height}`}>
              <a className="">
                <li
                  className={`p-2 rounded-sm ${
                    block.height === activeBlock
                      ? "bg-purple-300 text-white"
                      : "bg-purple-100 text-purple-500"
                  } hover:bg-purple-200`}
                >
                  {block.height}
                </li>
              </a>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default BlocksList;
