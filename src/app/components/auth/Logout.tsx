"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";

type PageProps = {
  session: Session | null;
};

export default function Logout({ session }: PageProps) {
  return (
    <div className="dropdown dropdown-end w-full">
      <label
        tabIndex={0}
        className="btn btn-circle w-full btn-ghost btn-xs text-info"
      >
        <Image
          src={session?.user?.image!}
          alt="profile picture"
          quality={100}
          height={32}
          width={40}
          className="rounded-full"
        ></Image>
      </label>
      <div
        tabIndex={0}
        className="card compact dropdown-content z-[1] shadow rounded-box border border-gray-400 bg-black w-32"
      >
        <div className="card-body">
          <ul className="flex flex-col">
            <li>
              <button
                onClick={() => signOut()}
                className="btn btn-sm btn-primary"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
