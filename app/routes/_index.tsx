import { useFetcher } from "@remix-run/react";

export default function Index() {
  const fetcher = useFetcher();

  function refreshData() {
    fetcher.load("/query-data");
  }

  return (
    <div className="container mx-auto max-w-lg">
      <div className="grid place-items-center pb-8">
        <h1 className="uppercase font-extrabold text-2xl py-4 text-slate-800">
          Query Cache Demo
        </h1>
        <p className="text-center text-md pt-2 font-light">
          Makes your regional database feel like it's globally distributed
        </p>
      </div>
      <div className="grid grid-cols-2 place-content-center justify-items-center items-center h-48 text-center">
        <div>
          <h2 className="uppercase font-extrabold text-2xl py-4 text-blue-800">
            Query Cache
          </h2>
          <p className="text-6xl text-orange-600 place-content-center">
            {fetcher.data?.sqc || 0}
          </p>
          <small className="block py-4">milliseconds</small>
        </div>
        <div>
          <h2 className="uppercase font-extrabold text-2xl py-4 text-blue-800">
            Direct
          </h2>
          <p className="text-6xl text-orange-600 place-content-center">
            {fetcher.data?.direct || 0}
          </p>
          <small className="block py-4">milliseconds</small>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 place-content-center justify-items-center items-center h-12">
        <p className="font-medium">{fetcher.data?.multiplier}</p>
        <button
          onClick={refreshData}
          className="object-center bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reload
        </button>
      </div>
    </div>
  );
}
