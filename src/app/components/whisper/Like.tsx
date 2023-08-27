"use client";

interface PageProps {
  whisper: any;
  setLikes: Function;
  setIsUserLiked: Function;
  likes: number;
}

export default function Like({
  whisper,
  setLikes,
  setIsUserLiked,
  likes,
}: PageProps) {
  const handleLikeClick = (e: any) => {
    e.stopPropagation();
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
  return (
    <button className="flex items-center gap-1 z-10" onClick={handleLikeClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-heart text-red-600"
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
      <p className="text-sm font-light">{likes}</p>
    </button>
  );
}
