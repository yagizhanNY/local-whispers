import { getServerSession } from "next-auth";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex sticky top-0 z-10 items-center justify-between bg-black py-4 px-8 mx-2 lg:mx-96 lg:px-40 bg-opacity-95">
      <Link href={"/"} className="text-gray-300 font-bold">
        Local Whispers
      </Link>
      <div className="flex">
        {session?.user === undefined && <Login />}
        {session?.user && <Logout session={session} />}
      </div>
    </nav>
  );
}
