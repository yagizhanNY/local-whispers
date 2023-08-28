"use client";

import WhisperImage from "./WhisperImage";
import { useSession } from "next-auth/react";
import WhisperDropdownItem from "./WhisperDropdownItem";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDate } from "../utils/dateUtils";
import { urlify } from "../utils/urlUtils";
import { generateIframeCode } from "../utils/youtubeUtils";
import Like from "./whisper/Like";
import Unlike from "./whisper/Unlike";
import CommentIcon from "./whisper/CommentIcon";
import { useRouter } from "next/navigation";

type PageProps = {
  whisper: any;
};

export default function WhisperContainer({ whisper }: PageProps) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(0);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [isUserLiked, setIsUserLiked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getLikes = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/like?id=${whisper.id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setLikes(data.count);
    };

    const checkIsUserLiked = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/like/${whisper.user.id}?whisperId=${whisper.id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setIsUserLiked(data.isExists);
    };

    getLikes();
    checkIsUserLiked();
  }, [whisper]);

  const extractYoutubeLinks = () => {
    const regex =
      /(https?:\/\/(?:www\.|m\.)?youtube\.com\/watch\?v=[\w-]{11})|(https?:\/\/youtu\.be\/[\w-]{11})/g;
    const matches = whisper.text.match(regex) || [];
    setYoutubeLinks(matches);
  };

  useEffect(() => {
    extractYoutubeLinks();
  }, []);

  const navigateToWhisperDetails = (whisperId: string) => {
    router.push(`/whisper-details/${whisperId}`);
  };

  return (
    <div
      onClick={() => navigateToWhisperDetails(whisper.id)}
      className="min-h-[10rem] p-2 border cursor-pointer border-gray-500 hover:bg-zinc-950"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
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
      <div className="flex flex-col w-full gap-4">
        <p
          dangerouslySetInnerHTML={{ __html: urlify(whisper.text) }}
          className="ml-4 mt-4 [&>a]:text-blue-600 [&>a]:underline"
        ></p>
        {youtubeLinks.map((link) => (
          <div
            className="mx-auto [&>iframe]:w-full [&>iframe]:h-40 lg:[&>iframe]:w-[400px] lg:[&>iframe]:h-[315px]"
            key={link}
            dangerouslySetInnerHTML={{ __html: generateIframeCode(link) }}
          />
        ))}
        {whisper.mediaUrl && whisper.mediaUrl !== "" && (
          <Image
            width={256}
            height={256}
            src={whisper.mediaUrl}
            alt="media"
            className="mx-auto rounded-md"
          ></Image>
        )}
      </div>
      <div className="flex gap-4 justify-end m-2">
        <div>
          <CommentIcon whisper={whisper} />
        </div>
        <div>
          {isUserLiked === false && (
            <Like
              whisper={whisper}
              setLikes={setLikes}
              setIsUserLiked={setIsUserLiked}
              likes={likes}
            ></Like>
          )}
          {isUserLiked === true && (
            <Unlike
              whisper={whisper}
              setLikes={setLikes}
              setIsUserLiked={setIsUserLiked}
              likes={likes}
            ></Unlike>
          )}
        </div>
      </div>
    </div>
  );
}
