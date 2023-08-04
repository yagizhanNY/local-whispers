"use client";

import { getWhispers } from "@/redux/features/whispers-slice";
import WhisperContainer from "./WhisperContainer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Timeline() {
  const whispers = useAppSelector((state) => state.whisper.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getWhispers());
  }, [dispatch]);
  return (
    <div>
      {whispers.map((w) => (
        <WhisperContainer key={w.id} whisper={w} />
      ))}
    </div>
  );
}
