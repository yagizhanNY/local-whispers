"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addWhisperSliceFunc } from "@/redux/features/whispers-slice";
import { mediaSlice, uploadMedia } from "@/redux/features/media-slice";

type PageProps = {
  session: Session | null;
};

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea === null) return;
  textArea!.style.height = "0";
  textArea!.style.height = `${textArea?.scrollHeight}px`;
}

export default function WhispFormInput({ session }: PageProps) {
  const currentMediaUrl = useAppSelector(
    (state) => state.media.currentMediaUrl
  );
  console.log("MEDIA URL: ", currentMediaUrl);
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  const handleFileUpload = (file: File) => {
    if (file) {
      let formData = new FormData();
      formData.append("media", file);

      dispatch(uploadMedia(formData));
    }
  };

  useEffect(() => {
    if (session?.user !== undefined) {
      updateTextAreaSize(textAreaRef.current);
    }
  }, [text, session?.user]);

  return (
    <>
      <div className="flex w-full">
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
        <div className="flex w-full flex-col">
          <textarea
            ref={inputRef}
            style={{ height: 0 }}
            className="w-full flex-grow resize-none overflow-hidden bg-transparent p-4 text-lg outline-none focus:border-b"
            placeholder="What's happenning?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {currentMediaUrl && (
            <Image
              src={currentMediaUrl}
              alt={""}
              width={128}
              height={128}
              className="p-4"
            ></Image>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center p-4">
        <label htmlFor="image_input" className="ml-4 hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-polaroid"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M4 16l16 0"></path>
            <path d="M4 12l3 -3c.928 -.893 2.072 -.893 3 0l4 4"></path>
            <path d="M13 12l2 -2c.928 -.893 2.072 -.893 3 0l2 2"></path>
            <path d="M14 7l.01 0"></path>
          </svg>
        </label>
        <input
          type="file"
          accept=".jpeg,.jpg,.png"
          name="image_input"
          id="image_input"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target?.files![0]!)}
        />
        <button
          onClick={() => {
            dispatch(
              addWhisperSliceFunc({
                content: text,
                email: session?.user?.email!,
                mediaUrl: currentMediaUrl ? currentMediaUrl : "",
              })
            );
            setText("");
            dispatch(mediaSlice.actions.resetCurrentMedia());
          }}
          className="btn btn-sm btn-primary"
        >
          Whisp
        </button>
      </div>
    </>
  );
}
