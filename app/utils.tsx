export const formatMultiplier = (sqc?: number, direct?: number) => {
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
        Using Cloudflare Hyperdrive is
        <span className="text-sm font-bold text-red-500 ml-1">
          {m.toPrecision(2)}x slower
        </span>
      </div>
    );
  }

  if (m === 1) {
    return (
      <div className="text-xs">
        Using Cloudflare Hyperdrive is
        <span className="text-sm font-bold text-blue-400 ml-1">
          the same speed
        </span>
      </div>
    );
  }

  return (
    <div className="text-xs">
      Using Cloudflare Hyperdrive is
      <span className="text-sm font-bold text-green-500 ml-1">
        {m.toPrecision(2)}x faster
      </span>
    </div>
  );
};
