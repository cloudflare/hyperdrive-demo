import { useFetcher, useRevalidator } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import type { LatencyResponse } from "./query-data";
import { LatencyBar } from "~/components/LatencyBar";
import { formatMultiplier } from "~/utils";
import { Header } from "~/components/Header";
import { RunResult, RunResult2 } from "~/components/RunResult";

// We should automatically refresh a limited number of times.
const REFRESH_INTERVAL_MS = 1 * 1000;
const MAX_ITERS = 10;
const MAX_REQUESTS = 4;
let ITERS = 0;

const Marketing = () => {
  return (
    <>
      <h1 className="uppercase font-bold tracking-[0.5em] text-lg">
        Query Cache
      </h1>
      <div>
        <p className="text-xl pt-4 font-light">
          Makes your regional database feel like it's globally distributed
        </p>
        <p className="text-sm pt-4 font-light">
          Cloudflare Query Cache is an upcoming product that allows developers
          to cache database reads (responses) within Cloudflare, directly
          improving performance for subsequent reads and reducing load (and
          cost) on their database.
        </p>
        <p className="text-sm pt-4 font-light">
          SQC is not itself a hosted database solution, but enables developers
          to build applications on top of Cloudflare Workers against their
          existing databases without paying the "price" of connecting back to a
          centralized (regional) database for every query. In other words: we
          make it easy for developers to accelerate their existing databases via
          Cloudflare's global network.
        </p>
        <p className="text-sm pt-4 font-light">
          This paragraph explains what all the stuff on the right means. There's
          some technical jargon but basically the one on top requests directly
          from the origin. The one on the bottom is the good one because it uses
          query cache. Just rambling here to make up more words.
        </p>
      </div>
    </>
  );
};

export default function Index() {
  const fetcher = useFetcher<LatencyResponse>();

  const [results, setResults] = useState<LatencyResponse[]>([]);
  const [fetching, setFetching] = useState(false);

  const queryButtonText = fetching ? "Running Queries..." : "Compare Latency";

  function runQueries() {
    setResults([]);
    setFetching(true);
  }

  function nextRequest() {
    if (results.length < MAX_REQUESTS) {
      fetcher.load("/query-data");
    } else {
      setFetching(false);
    }
  }

  function finishRequest(data: LatencyResponse) {
    setResults([...results, data]);
    // clearInterval(interval.current);
  }

  useEffect(() => {
    if (!fetching) return;

    if (fetcher.state === "idle") {
      if (fetcher.data) {
        finishRequest(fetcher.data);
      }
      nextRequest();
    }
  }, [fetcher, fetching]);

  useEffect(() => {
    runQueries();
  }, []);

  return (
    <div className="container mx-auto w-full lg:w-1/2 md:w-3/4">
      <Header />
      <div className="flex justify-between gap-20 mb-4">
        <div className="flex-1">
          <Marketing />
        </div>
        <div className="flex-auto">
          <div className="flex justify-center mb-2">
            <button
              disabled={fetching}
              onClick={runQueries}
              className="py-2 px-4 mb-2 object-center bg-blue-800 hover:bg-blue-700 disabled:bg-blue-500 text-white font-bold rounded w-56 max-w-md"
            >
              {queryButtonText}
            </button>
          </div>
          {results.map((result, i) => (
            <RunResult key={i} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
}
