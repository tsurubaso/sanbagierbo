"use client";

import packageJson from "../package.json";

export default function PackageInfo() {
  const { name, version, description, dependencies, devDependencies } = packageJson;

  return (
    <main className="bg-black-500 p-12 flex flex-col items-center">
      {/* HEADER */}
      <div className="text-center mb-16 mt-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-800">
          {name}
        </h1>
        <p className="text-lg text-gray-600 mt-3">📦 Version {version}</p>
        {description && (
          <p className="text-md text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* DEPENDENCIES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
        <section className="bg-gray shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Dependencies</h2>
          <ul className="space-y-2 text-gray-400">
            {dependencies &&
              Object.entries(dependencies).map(([lib, ver]) => (
                <li
                  key={lib}
                  className="flex justify-between items-center bg-gray-600 hover:bg-gray-200 transition rounded-lg px-3 py-2"
                >
                  <span className="font-medium">{lib}</span>
                  <span className="text-sm text-gray-100">{ver}</span>
                </li>
              ))}
          </ul>
        </section>

        <section className="bg-gray shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Dev Dependencies</h2>
          <ul className="space-y-2 text-gray-400">
            {devDependencies &&
              Object.entries(devDependencies).map(([lib, ver]) => (
                <li
                  key={lib}
                  className="flex justify-between items-center bg-gray-600 hover:bg-gray-200 transition rounded-lg px-3 py-2"
                >
                  <span className="font-medium">{lib}</span>
                  <span className="text-sm text-gray-100">{ver}</span>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
