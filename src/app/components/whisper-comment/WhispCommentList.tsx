"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import WhispCommentCard from "./WhispCommentCard";
import { useEffect } from "react";
import { getWhispComments } from "@/redux/features/whisp-comment";

interface PageProps {
  whisper: any;
}

export default function WhispCommentList({ whisper }: PageProps) {
  const whispComments = useAppSelector((state) => state.whispComment.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWhispComments(whisper.id));
  }, [dispatch, whisper.id]);
  return (
    <div>
      {whispComments.map((w) => (
        <WhispCommentCard key={w.id} whispComment={w} />
      ))}
    </div>
  );
}
