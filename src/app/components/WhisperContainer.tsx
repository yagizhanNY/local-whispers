"use client";

import WhisperImage from "./WhisperImage";
import { useSession } from "next-auth/react";
import WhisperDropdownItem from "./WhisperDropdownItem";

type PageProps = {
  whisper: any;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return `${String(date.getDate()).padStart(2, "0")}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${date.getFullYear()} ${String(date.getHours()).padStart(
    2,
    "0"
  )}:${String(date.getMinutes()).padStart(2, "0")}`;
};

export default function WhisperContainer({ whisper }: PageProps) {
  const { data: session } = useSession();
  console.log(whisper);
  return (
    <div className="min-h-[10rem] p-2 border border-gray-500">
      <div className="flex justify-between">
        <div className="flex items-center gap-8">
          <WhisperImage image={whisper.user?.image} />
          <div className="flex flex-col">
            <h1 className="font-bold text-sm">{whisper.user?.name}</h1>
            <p className="text-xs font-light">
              {formatDate(whisper.createdAt)}
            </p>
          </div>
        </div>
        {session?.user?.email === whisper?.user?.email && (
          <WhisperDropdownItem whisperId={whisper.id} />
        )}
      </div>
      <p className="ml-16 mt-4">{whisper.text}</p>
    </div>
  );
}
