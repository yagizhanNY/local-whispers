"use client";
import { useEffect, useState } from "react";

interface PageProps {
  whisper: any;
}

export default function CommentIcon({ whisper }: PageProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getQuantity = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/whisper-comment/count?id=${whisper.id}`,
        {
          method: "GET",
        }
      );

      const countItem = await response.json();

      setCount(countItem.count);
    };

    getQuantity();
  }, [whisper.id]);
  return (
    <div className="flex gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-message-dots"
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
        <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4"></path>
        <path d="M12 11l0 .01"></path>
        <path d="M8 11l0 .01"></path>
        <path d="M16 11l0 .01"></path>
      </svg>
      <p>{count}</p>
    </div>
  );
}
