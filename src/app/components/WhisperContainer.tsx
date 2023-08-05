"use client";

import { useAppDispatch } from "@/redux/hooks";
import WhisperImage from "./WhisperImage";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteWhisper } from "@/redux/features/whispers-slice";
import { useSession } from "next-auth/react";
import WhisperDropdownItem from "./WhisperDropdownItem";

type PageProps = {
  whisper: any;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return `${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

export default function WhisperContainer({ whisper }: PageProps) {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
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
        {session?.user?.email === whisper.user.email && (
          // <button onClick={() => dispatch(deleteWhisper(whisper.id))}>
          //   <MdOutlineDeleteOutline />
          // </button>
          <WhisperDropdownItem />
        )}
      </div>
      <p className="ml-16 mt-4">{whisper.text}</p>
    </div>
  );
}
