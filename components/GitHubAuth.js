"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function GitHubAuth() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <section className="bg-gray-600 shadow-md rounded-xl p-6 border border-gray-500 text-center">
        <p className="text-gray-500">⏳ Loading...</p>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="bg-gray-600 shadow-md rounded-xl p-6 border border-gray-500 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">GitHub Login</h2>
        <button
          onClick={() => signIn("github")}
          className="px-5 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          🔑 Login with GitHub
        </button>
      </section>
    );
  }

  return (
    <section className="bg-gray-600 shadow-md rounded-xl p-6 border border-gray-500 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-400">GitHub Session</h2>
      <p className="text-gray-500 mb-4">
        Connected as <b>{session.user?.name}</b>
      </p>
      <button
        onClick={() => signOut()}
        className="px-5 py-2 rounded-lg bg-gray-300 text-white hover:bg-red-700 transition"
      >
        Logout
      </button>
    </section>
  );
}
