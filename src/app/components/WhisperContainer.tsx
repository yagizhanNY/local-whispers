"use client";

import WhisperImage from "./WhisperImage";
import { useSession } from "next-auth/react";
import WhisperDropdownItem from "./WhisperDropdownItem";
import { useEffect, useState } from "react";

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
  const [likes, setLikes] = useState(0);
  const [isUserLiked, setIsUserLiked] = useState(false);

  const handleLikeClick = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/like`, {
      method: "POST",
      body: JSON.stringify({
        whisperId: whisper.id,
        userId: whisper.user.id,
        isLike: true,
      }),
    }).then((response) => {
      response.json().then((data) => {
        setLikes(data.count);
        setIsUserLiked(true);
      });
    });
  };

  const handleUnlikeClick = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/like`, {
      method: "POST",
      body: JSON.stringify({
        whisperId: whisper.id,
        userId: whisper.user.id,
        isLike: false,
      }),
    }).then((response) => {
      response.json().then((data) => {
        setLikes(data.count);
        setIsUserLiked(false);
      });
    });
  };

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
        `${process.env.NEXT_PUBLIC_API_URL}/like/${whisper.user.id}`,
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
      <div className="flex justify-end m-2">
        <div className="flex items-center gap-1">
          {isUserLiked === false && (
            <button onClick={() => handleLikeClick()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-heart"
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
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
              </svg>
            </button>
          )}
          {isUserLiked === true && (
            <button onClick={() => handleUnlikeClick()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-heart-filled"
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
                <path
                  d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
                  stroke-width="0"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          )}
          <p className="text-sm font-light">{likes}</p>
        </div>
      </div>
    </div>
  );
}
