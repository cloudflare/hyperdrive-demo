import { json, type LoaderArgs } from "@remix-run/cloudflare";

const BENCHMARK_URL =
  "https://hyperdrive-benchmarks.silverlock.workers.dev/?from=demo";

export interface QueryResult {
  query: number;
  total: number;
}

export interface LatencyResponse {
  hyperdrive: QueryResult;
  direct: QueryResult;
}

interface QueryAPIResponse {
  hyperdrive: DBResult;
  direct: DBResult;
}

interface DBResult {
  query: string;
  totalLatencyMs: number;
  queryLatencyMs: number;
  rows: any;
}

export async function loader({ context, params }: LoaderArgs) {
  let resp = await fetch(BENCHMARK_URL);
  if (!resp.ok) {
    console.error(`failed to fetch Hyperdrive data: ${resp.status}`);
    return json({}, { status: 500 });
  }

  let data: QueryAPIResponse = await resp.json();
  let latencies: LatencyResponse = {
    hyperdrive: {
      query: data.hyperdrive.queryLatencyMs,
      total: data.hyperdrive.totalLatencyMs,
    },
    direct: {
      query: data.direct.queryLatencyMs,
      total: data.direct.totalLatencyMs,
    },
  };

  return json(latencies);
}

// FOR DEV ONLY
// export async function loader({ params }: LoaderArgs) {
//   const query = Math.floor(Math.random() * 150);
//
//   await sleep(Math.random() * 1000 + 200);
//
//   const latencies: LatencyResponse = {
//     hyperdrive: {
//       query,
//       total: query + Math.floor(Math.random() * 400) + 75,
//     },
//     direct: {
//       query,
//       total: query + Math.floor(Math.random() * 700) + 75,
//     },
//   };
//
//   return json(latencies);
// }

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
