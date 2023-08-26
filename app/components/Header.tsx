import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { CloudflareLogo } from "~/components/CloudflareLogo";

export const Header = () => {
  const toggleDarkMode = () => {
    document.documentElement.classList.add("dark");
  };

  const toggleLightMode = () => {
    document.documentElement.classList.remove("dark");
  };

  return (
    <div className="flex justify-between mb-5">
      <CloudflareLogo />
      <div className="flex p-1 bg-gray-300 dark:bg-gray-500 rounded">
        <button
          className={`p-1 mr-1 rounded bg-gray-200 dark:bg-gray-500 transition-colors delay-50 ease-in`}
          onClick={toggleLightMode}
        >
          <SunIcon
            strokeWidth={2}
            // className={`transition w-4 h-4 text-orange-500 dark:text-gray-900 hover:scale-120`}
            className={`w-4 h-4 text-orange-500 dark:text-gray-900`}
          />
        </button>
        <button
          className={`p-1 rounded bg-gray-300 dark:bg-gray-200 transition-colors delay-50 ease-in`}
          onClick={toggleDarkMode}
        >
          <MoonIcon
            strokeWidth={2}
            className={`w-4 h-4 text-gray-900 dark:text-orange-500`}
          />
        </button>
      </div>
    </div>
  );
};
