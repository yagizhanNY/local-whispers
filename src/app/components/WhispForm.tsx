import { getServerSession } from "next-auth";
import WhispFormInput from "./WhispFormInput";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function WhispForm() {
  const session = await getServerSession(authOptions);

  if (session?.user === undefined) return;
  return (
    <form className="flex flex-col gap-2 p-2 mt-5 border border-gray-500">
      <WhispFormInput session={session} />
    </form>
  );
}
