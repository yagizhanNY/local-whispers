import { getServerSession } from "next-auth";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex sticky top-0 z-10 items-center justify-between py-4 px-8 mx-2 lg:mx-96">
      <h1 className="text-gray-500 font-bold">Local Whispers</h1>
      <div className="flex">
        {session?.user === undefined && <Login />}
        {session?.user && <Logout session={session} />}
      </div>
    </nav>
  );
}
