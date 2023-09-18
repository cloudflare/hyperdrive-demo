import { json, type LoaderArgs } from "@remix-run/cloudflare";

export interface LatencyResponse {
  sqc: {
    query: number;
    total: number;
  };
  direct: {
    query: number;
    total: number;
  };
}

interface QueryAPIResponse {
  sqc: DBResult;
  direct: DBResult;
}

interface DBResult {
  query: string;
  totalLatencyMs: number;
  queryLatencyMs: number;
  rows: any;
}

export async function loader({ params }: LoaderArgs) {
  let resp = await fetch("https://sqc-demo.silverlock.workers.dev/");
  if (!resp.ok) {
    console.error(`failed to fetch SQC data: ${resp.status}`);
    return json({ err: "failed to fetch" }, { status: 500 });
  }

  let data: QueryAPIResponse = await resp.json();
  let latencies: LatencyResponse = {
    sqc: {
      query: data.sqc.queryLatencyMs,
      total: data.sqc.totalLatencyMs,
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
//     sqc: {
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
