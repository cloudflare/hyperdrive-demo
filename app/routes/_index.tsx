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
        Hyperdrive
      </h1>
      <div>
        <p className="text-xl pt-4 font-light">
          Turns your existing regional databases into globally distributed
          ones.
        </p>
        <p className="text-sm pt-4 font-light">
          Hyperdrive accelerates the queries you make to databases you already
          have, making it faster to access your data from across the planet, no
          matter where your users are.
        </p>
        <p className="text-sm pt-4 font-light">
          Hyperdrive supports any Postgres database, including those hosted on
          AWS, Google Cloud and Neon, as well as Postgres-compatible databases
          like CockroachDB and Timescale.{" "}
          <span className="font-bold">
            You can also still use your existing Postgres drivers and your
            favorite ORM libraries without any changes
          </span>
          : Hyperdrive gives you a connection string that looks just like any
          other. No need to write new code or replace your favorite tools:
          Hyperdrive works with the ones you already use.
        </p>
        <p className="text-sm pt-4 font-light">
          By maintaining a connection pool to your database within Cloudflare's
          network,{" "}
          <span className="font-bold">
            Hyperdrive cuts out what can typically be over six round-trips to
            your database before you can even send a query
          </span>
          : the TCP handshake (3x), TLS negotiation (2-3x) and database
          authentication (1x). On top of that, Hyperdrive understands the
          difference between read and write queries to your database, and can
          intelligently cache the most common read queries made: improving both
          query performance <i>and</i> reducing load on your origin database.
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
    <div className="container mx-auto w-full md:w-3/4 xl:w-1/2">
      <Header />
      <div className="flex flex-wrap-reverse justify-between gap-20 md:gap-10 mb-4 pb-12">
        {/* <div className="flex-1"> */}
        <div className="flex-1">
          <Marketing />
        </div>
        {/* <div className="flex-auto"> */}
        <div className="flex-1 min-w-[350px]">
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
