import { useFetcher, useRevalidator } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import type { LatencyResponse } from "./query-data";
import { CloudflareLogo } from "~/components/CloudflareLogo";

// We should automatically refresh a limited number of times.
const REFRESH_INTERVAL_MS = 1 * 1000;
const MAX_ITERS = 10;
let ITERS = 0;

const formatMultiplier = (sqc?: number, direct?: number) => {
  if (!sqc || !direct) {
    return "";
  }

  let m = direct / sqc;

  if (isNaN(m)) {
    return <div>N/A</div>;
  }

  if (m < 1) {
    m = sqc / direct;
    return (
      <div className="text-xs">
        Using Cloudflare Query Cache is
        <span className="text-sm font-bold text-red-500 ml-1">
          {m.toPrecision(2)}x slower
        </span>
      </div>
    );
  }

  return (
    <div className="text-xs">
      Using Cloudflare Query Cache is
      <span className="text-sm font-bold text-green-500 ml-1">
        {m.toPrecision(2)}x faster
      </span>
    </div>
  );
};

const MAX_REQUESTS = 3;

const Header = () => {
  return (
    <div className="flex justify-between mb-5">
      <CloudflareLogo />
      {/* <div className="grid place-items-center pb-8">
        <p className="text-center text-md italic pt-2 font-light">
          Makes your regional database feel like it's globally distributed
        </p>
      </div> */}
      <button>Dark</button>
    </div>
  );
};

const Marketing = () => {
  return (
    <div>
      <p className="text-xl pt-4 font-light">
        Makes your regional database feel like it's globally distributed
      </p>
      <p className="text-sm pt-4 font-light">
        Cloudflare Query Cache is an upcoming product that allows developers to
        cache database reads (responses) within Cloudflare, directly improving
        performance for subsequent reads and reducing load (and cost) on their
        database.
      </p>
      <p className="text-sm pt-4 font-light">
        SQC is not itself a hosted database solution, but enables developers to
        build applications on top of Cloudflare Workers against their existing
        databases without paying the "price" of connecting back to a centralized
        (regional) database for every query. In other words: we make it easy for
        developers to accelerate their existing databases via Cloudflare's
        global network.
      </p>
      <p className="text-sm pt-4 font-light">
        This paragraph explains what all the stuff on the right means. There's
        some technical jargon but basically the one on top requests directly
        from the origin. The one on the bottom is the good one because it uses
        query cache. Just rambling here to make up more words.
      </p>
    </div>
  );
};

export default function Index() {
  const fetcher = useFetcher<LatencyResponse>();

  const [results, setResults] = useState<LatencyResponse[]>([]);
  const [fetching, setFetching] = useState(false);
  // const [timer, setTimer] = useState(0);
  // const interval = useRef<ReturnType<typeof setInterval>>();

  const queryButtonText = fetching ? "Running Queries..." : "Compare Latency";

  function runQueries() {
    setResults([]);
    setFetching(true);
  }

  function nextRequest() {
    if (results.length < MAX_REQUESTS) {
      fetcher.load("/query-data");
      // interval.current = setInterval(() => {
      //   setTimer((prev) => {
      //     return prev + 10;
      //   });
      // }, 10);
      // setTimer(0);
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
      <div className="flex justify-between gap-20">
        <div className="flex-1">
          <h1 className="uppercase font-bold tracking-[0.5em] text-lg pt-4">
            Query Cache
          </h1>
          <Marketing />
        </div>
        <div className="flex-auto">
          <div className="flex justify-center mb-2">
            <button
              disabled={fetching}
              onClick={runQueries}
              className="object-center bg-blue-800 hover:bg-blue-700 disabled:bg-blue-500 text-white font-bold py-2 px-4 rounded w-56 max-w-md"
            >
              {queryButtonText}
            </button>
          </div>
          {results.map((result, i) => {
            const range = Math.max(result.direct.total, result.sqc.total);
            const directTotal = Math.round((result.direct.total / range) * 100);
            const sqcTotal = Math.round((result.sqc.total / range) * 100);
            const directQueryTime = Math.round(
              (result.direct.query / range) * 100,
            );
            const sqcQueryTime = Math.round(
              (result.direct.query / range) * 100,
            );
            const now = new Date();

            return (
              <div
                key={i}
                // className="border rounded border-zinc-400 my-2 p-3 flex flex-row justify-between"
                className="bg-zinc-900 rounded my-2 p-3 flex flex-row justify-between"
              >
                <div className="grow">
                  <div className="mb-4">
                    <div className="text-xs font-bold mb-1">
                      Request Duration Directly to Origin
                    </div>
                    <div
                      className="bg-gray-600 rounded mb-2"
                      style={{ width: `${directTotal}%` }}
                    >
                      <div className="text-sm text-white p-1 ml-2">
                        {result.direct.total}
                        <span className="ml-1">ms</span>
                      </div>
                    </div>
                    <div
                      className="bg-gray-600 rounded h-1 mb-1"
                      style={{ width: `${directQueryTime}%` }}
                    ></div>
                  </div>
                  <div className="mb-2">
                    <div className="text-xs font-bold mb-1">
                      Request Duration with Query Cache
                    </div>
                    <div
                      className="bg-orange-600 rounded mb-2"
                      style={{ width: `${sqcTotal}%` }}
                    >
                      <div className="text-sm text-white p-1 ml-2">
                        {result.sqc.total}
                        <span className="ml-1">ms</span>
                      </div>
                    </div>
                    <div
                      className="bg-orange-600 rounded h-1 mb-1"
                      style={{ width: `${sqcQueryTime}%` }}
                    ></div>
                  </div>
                  {formatMultiplier(result.sqc.total, result.direct.total)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
