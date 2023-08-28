"use client";

import WhisperContainer from "@/app/components/WhisperContainer";
import WhispCommentList from "@/app/components/whisper-comment/WhispCommentList";
import WhisperCommentInput from "@/app/components/whisper-comment/WhisperCommentInput";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [whisper, setWhisper] = useState(undefined);

  useEffect(() => {
    const getWhisper = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/whisper/single?id=${params.id}`,
        {
          method: "GET",
        }
      );

      setWhisper(await response.json());
    };

    getWhisper();
  }, [params.id]);

  return (
    <div className="mx-2 px-4 lg:mx-96 lg:px-40">
      {whisper && (
        <div>
          <WhisperContainer whisper={whisper} />
          {session?.user && <WhisperCommentInput whisper={whisper} />}
          <WhispCommentList whisper={whisper} />
        </div>
      )}
    </div>
  );
}
