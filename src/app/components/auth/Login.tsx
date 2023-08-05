"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button onClick={() => signIn()} className="btn btn-sm btn-primary">
      Sign In
    </button>
  );
}
