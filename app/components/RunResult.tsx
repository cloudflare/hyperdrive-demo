import { LatencyResponse } from "~/routes/query-data";
import { LatencyBar } from "./LatencyBar";
import { formatMultiplier } from "~/utils";

type Props = {
  key: number;
  result: LatencyResponse;
};

export const RunResult = ({ key, result }: Props) => {
  let hyperdriveTotal = result.hyperdrive.total || 0;
  let directTotal = result.direct.total || 0;
  const maxValue = Math.max(directTotal, hyperdriveTotal);

  return (
    <div
      key={key}
      // className="border rounded border-zinc-400 my-2 p-3 flex flex-row justify-between"
      className="bg-zinc-200 dark:bg-zinc-900 rounded my-2 p-3 flex flex-row justify-between"
    >
      <div className="grow">
        <LatencyBar
          totalMs={directTotal}
          maxValue={maxValue}
          label={"direct to origin database"}
          color="zinc-600"
        />
        <LatencyBar
          totalMs={hyperdriveTotal}
          maxValue={maxValue}
          label={"with Hyperdrive"}
          color="orange-600"
        />
        {formatMultiplier(hyperdriveTotal, directTotal)}

        {/* hack for fancy tailwind color optimizer */}
        <span className="bg-orange-600" />
        <span className="bg-zinc-600" />
        <span className="opacity-0" />
      </div>
    </div>
  );
};

export const RunResult2 = ({ key, result }: Props) => {
  const maxValue = Math.max(result.direct.total, result.hyperdrive.total);

  return (
    <div
      key={key}
      className="border border-zinc-500 dark:border-zinc-400 rounded my-2 p-3 flex flex-row justify-between"
    >
      <div className="grow">
        <LatencyBar
          totalMs={result.direct.total}
          maxValue={maxValue}
          label={"direct to origin database"}
          color="zinc-600"
        />
        <LatencyBar
          totalMs={result.hyperdrive.total}
          maxValue={maxValue}
          label={"with Hyperdrive"}
          color="orange-600"
        />
        {formatMultiplier(result.hyperdrive.total, result.direct.total)}

        {/* hack for fancy tailwind color optimizer */}
        <span className="bg-orange-600" />
        <span className="bg-zinc-600" />
        <span className="opacity-0" />
      </div>
    </div>
  );
};
