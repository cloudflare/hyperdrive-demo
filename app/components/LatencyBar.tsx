import { useEffect, useState } from "react";

type Props = {
  totalMs: number;
  maxValue: number;
  label: string;
  color: string;
};

export const LatencyBar = ({ totalMs, maxValue, label, color }: Props) => {
  // Maximum width of the bar, as a percentage. If this was the slower query, it's 100%
  const maxWidth = Math.round((totalMs / maxValue) * 100);
  // How much we will increment per step
  const increment = 100 / maxValue;
  // the width of the bar as a percentage of its total potential width
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (width >= maxWidth) return;

    const timer = setInterval(() => {
      setWidth(width + increment);
    }, 1);

    return () => clearInterval(timer);
  }, [width]);

  // const labelOpacity = Math.round((width / maxWidth) * 100) / 100;
  const labelVisible = width >= maxWidth - 5;

  return (
    <div className="mb-2">
      <div className="flex justify-items-start">
        <div
          className={`bg-${color} text-slate-50 rounded mb-2 flex justify-between items-baseline`}
          style={{
            width: `${width}%`,
            height: "30px",
          }}
        >
          <div className="text-sm p-1 ml-2">
            {totalMs}
            <span className="ml-1">ms</span>
          </div>
          <div
            className={`transition-opacity whitespace-nowrap overflow-hidden text-ellipsis opacity-${
              labelVisible ? 100 : 0
            } text-xs mr-2`}
          >
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

export const LatencyBar2 = ({ totalMs, maxValue, label, color }: Props) => {
  const normalized = Math.round((totalMs / maxValue) * 100);

  return (
    <div className="mb-2">
      <div className="flex justify-items-start">
        <div
          className={`bg-${color} rounded mb-2 flex justify-between items-center`}
          style={{
            width: `${normalized}%`,
            // animation: `progress ${4 * normalized}ms linear`,
            animation: `progress 700ms linear`,
            transformOrigin: "0% 50%",
          }}
        >
          <div className="text-sm text-slate-400 p-1 ml-2">
            {totalMs}
            <span className="ml-1">ms</span>
          </div>
          <div className="text-xs font-bold mr-2">{label}</div>
        </div>
      </div>
    </div>
  );
};
