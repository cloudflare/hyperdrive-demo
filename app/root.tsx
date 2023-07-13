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

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    href: `data:image/svg+xml;utf8,<svg xmlns="http://w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚡</text></svg>`,
  },
];

export const meta: V2_MetaFunction = ({ matches, location, params, data }) => {
  return [
    {
      charSet: "utf-8",
      title: "Cloudflare Query Cache x Remix",
      description:
        "A demo app that uses Cloudflare Query Cache to dramatically speed up database access.",
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-200	">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
