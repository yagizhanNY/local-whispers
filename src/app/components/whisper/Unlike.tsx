"use client";

interface PageProps {
  whisper: any;
  setLikes: Function;
  setIsUserLiked: Function;
  likes: number;
}

export default function Unlike({
  whisper,
  setLikes,
  setIsUserLiked,
  likes,
}: PageProps) {
  const handleUnlikeClick = (e: any) => {
    e.stopPropagation();
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
  return (
    <button
      className="flex items-center gap-1 z-10"
      onClick={handleUnlikeClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-heart-filled text-red-600"
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
          strokeWidth="0"
          fill="currentColor"
        ></path>
      </svg>
      <p className="text-sm font-light">{likes}</p>
    </button>
  );
}
