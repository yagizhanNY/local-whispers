"use client";

import WhisperImage from "../WhisperImage";
import { formatDate } from "@/app/utils/dateUtils";
import { urlify } from "@/app/utils/urlUtils";
import { useSession } from "next-auth/react";
import WhispCommentDropdown from "./WhispCommentDropdown";

interface PageProps {
  whispComment: any;
}

export default function WhispCommentCard({ whispComment }: PageProps) {
  const { data: session } = useSession();
  return (
    <div className="min-h-[10rem] p-2 border border-gray-500">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          {whispComment.user && (
            <WhisperImage image={whispComment.user?.image} />
          )}

          <div className="flex flex-col">
            <h1 className="font-bold text-sm">{whispComment.user?.name}</h1>
            <p className="text-xs font-light">
              {formatDate(whispComment.createdAt)}
            </p>
          </div>
        </div>
        {session?.user?.email === whispComment.user?.email && (
          <WhispCommentDropdown whispCommentId={whispComment.id} />
        )}
      </div>
      <div className="flex flex-col w-full gap-4">
        <p
          dangerouslySetInnerHTML={{ __html: urlify(whispComment.text) }}
          className="ml-4 mt-4 [&>a]:text-blue-600 [&>a]:underline"
        ></p>
      </div>
    </div>
  );
}
