import { getServerSession } from "next-auth";
import WhispFormInput from "./WhispFormInput";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function WhispForm() {
  const session = await getServerSession(authOptions);

  if (session?.user === undefined) return;
  return (
    <form className="flex flex-col gap-2 border-b p-2 mt-5 border">
      <WhispFormInput session={session} />
    </form>
  );
}
