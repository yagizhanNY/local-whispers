"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { addWhisperSliceFunc } from "@/redux/features/whispers-slice";

type PageProps = {
  session: Session | null;
};

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea === null) return;
  textArea!.style.height = "0";
  textArea!.style.height = `${textArea?.scrollHeight}px`;
}

export default function WhispFormInput({ session }: PageProps) {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  useEffect(() => {
    if (session?.user !== undefined) {
      updateTextAreaSize(textAreaRef.current);
    }
  }, [text, session?.user]);
  return (
    <>
      <div className="flex w-full items-center">
        <div className="mr-4">
          {session?.user?.image && (
            <Image
              width={32}
              height={32}
              quality={100}
              src={session!.user!.image}
              alt="profile picture"
              className="rounded-full"
            ></Image>
          )}
        </div>
        <textarea
          ref={inputRef}
          style={{ height: 0 }}
          className="w-full flex-grow resize-none overflow-hidden bg-transparent p-4 text-lg outline-none"
          placeholder="What's happenning?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          dispatch(
            addWhisperSliceFunc({
              content: text,
              email: session?.user?.email!,
            })
          );
          setText("");
        }}
        className="self-end btn btn-sm btn-primary"
      >
        Whisp
      </button>
    </>
  );
}
