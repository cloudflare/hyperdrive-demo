import type { LinksFunction, V2_MetaFunction } from "@remix-run/cloudflare";
import stylesheet from "~/tailwind.css";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 16 16'><text x='0' y='14'>🧪</text></svg>",
  },
];

export const meta: V2_MetaFunction = ({ matches, location, params, data }) => {
  return [
    {
      charSet: "utf-8",
      title: "Cloudflare Hyperdrive Demo",
      description:
        "Hyperdrive makes your existing regional databases feel like they're globally distributed.",
    },
  ];
};

export default function App() {
  useEffect(() => {});

  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      {/* <body className="bg-slate-200"> */}
      {/* <body className="bg-gradient-to-b from-[#ffffff] dark:from-[#000000] from-15% to-[#ECF4FF] dark:to-[#1D1D1D] to-80%"> */}
      <body>
        <div className="bg-sky-100 dark:bg-zinc-900 overflow-auto">
          <div className="bg-gradient-to-b from-white dark:from-black to-sky-100 dark:to-zinc-900 h-screen">
            <main className="h-screen text-black dark:text-white p-8">
              <Outlet />
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
