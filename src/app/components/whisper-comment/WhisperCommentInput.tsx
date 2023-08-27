"use client";

import { addWhispCommentSliceFunc } from "@/redux/features/whisp-comment";
import { useAppDispatch } from "@/redux/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface PageProps {
  whisper: any;
}

export default function WhisperCommentInput({ whisper }: PageProps) {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const handleSend = () => {
    dispatch(
      addWhispCommentSliceFunc({
        text: text,
        email: session!.user!.email!,
        whisperId: whisper.id,
      })
    );
    setText("");
  };
  return (
    <div className="flex items-center my-4 p-2 gap-4 w-full">
      {session?.user && (
        <Image
          src={session.user.image!}
          alt="profile_picture"
          width={32}
          height={32}
          quality={100}
          className="rounded-full"
        />
      )}
      <input
        className="w-full bg-transparent outline-none focus:border-b"
        type="text"
        placeholder="Send your comment"
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></input>
      <button onClick={() => handleSend()} className="btn btn-sm btn-primary">
        Send
      </button>
    </div>
  );
}
