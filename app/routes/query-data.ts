import { json, type LoaderArgs } from "@remix-run/cloudflare";

interface APIResponse {
  sqc: DBResult;
  direct: DBResult;
}

interface DBResult {
  query: string;
  connectionLatencyMs: number;
  queryLatencyMs: number;
  rows: any;
}

export async function loader({ params }: LoaderArgs) {
  let resp = await fetch("https://sqc-demo.silverlock.workers.dev/");
  if (!resp.ok) {
    console.error(`failed to fetch SQC data: ${resp.status}`);
    return json({ err: "failed to fetch" }, { status: 500 });
  }

  let data: APIResponse = await resp.json();
  let latencies = {
    sqc: {
      query: data.sqc.queryLatencyMs,
      connect: data.sqc.connectionLatencyMs,
    },
    direct: {
      query: data.direct.queryLatencyMs,
      connect: data.direct.connectionLatencyMs,
    },
  };
  return json(latencies);
}
