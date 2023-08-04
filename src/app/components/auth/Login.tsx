"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button
      onClick={() => signIn()}
      className="bg-blue-500 py-2 px-6 text-white rounded-md hover:bg-blue-400"
    >
      Sign In
    </button>
  );
}
