import { useFetcher } from "@remix-run/react";
import type { LatencyResponse } from "./query-data";

export default function Index() {
  const fetcher = useFetcher<LatencyResponse>();

  function formatMultiplier(sqc?: number, direct?: number): string {
    if (!sqc || !direct) {
      return "";
    }

    let m = direct / sqc;

    if (m < 1) {
      m = sqc / direct;
      return `${m.toPrecision(2)}x slower`;
    }

    if (isNaN(m)) {
      return "N/A";
    }

    return `${m.toPrecision(2)}x faster`;
  }

  const queryButtonText =
    fetcher.state === "submitting" || fetcher.state === "loading"
      ? "Running Query..."
      : "Run Query";

  function refreshData() {
    fetcher.load("/query-data");
  }

  return (
    <div className="container mx-auto max-w-lg">
      <div className="grid place-items-center pb-8">
        <h1 className="uppercase font-extrabold text-2xl pt-4 text-slate-800">
          Cloudflare Query Cache Demo
        </h1>
        <p className="text-center text-md italic pt-2 font-light">
          Makes your regional database feel like it's globally distributed
        </p>
      </div>
      <div className="grid grid-cols-2 place-content-center justify-items-center items-center h-48 text-center">
        <div>
          <h2 className="uppercase font-extrabold text-2xl py-4 text-blue-800">
            Query Cache
          </h2>
          <p className="text-5xl font-bold text-orange-600 place-content-center">
            {fetcher.data?.sqc?.total || 0} ms
          </p>
          <small className="font-medium	block pt-2">
            Query: {fetcher.data?.sqc?.query || 0} ms
          </small>
        </div>
        <div>
          <h2 className="uppercase font-extrabold text-2xl py-4 text-blue-800">
            Direct
          </h2>
          <p className="text-5xl font-bold text-orange-600 place-content-center">
            {fetcher.data?.direct?.total || 0} ms
          </p>
          <small className="font-medium	block pt-2">
            Query: {fetcher.data?.direct?.query || 0} ms
          </small>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 place-content-center justify-items-center items-center pt-12 h-12">
        <p className="font-medium text-2xl h-8">
          {formatMultiplier(
            fetcher.data?.sqc?.total,
            fetcher.data?.direct?.total
          )}
        </p>
        <button
          onClick={refreshData}
          className="object-center bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-56 max-w-md"
        >
          {queryButtonText}
        </button>
      </div>
    </div>
  );
}
