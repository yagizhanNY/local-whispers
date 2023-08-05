"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";

type PageProps = {
  session: Session | null;
};

export default function Logout({ session }: PageProps) {
  return (
    <div className="flex gap-4">
      <button onClick={() => signOut()} className="btn btn-sm btn-primary">
        Sign Out
      </button>
      <Image
        src={session?.user?.image!}
        alt="profile picture"
        quality={100}
        height={32}
        width={40}
        className="rounded-full"
      ></Image>
    </div>
  );
}
