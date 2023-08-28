import WhisperContainer from "@/app/components/WhisperContainer";
import WhispCommentList from "@/app/components/whisper-comment/WhispCommentList";
import WhisperCommentInput from "@/app/components/whisper-comment/WhisperCommentInput";
import { getWhisperById } from "@/app/services/whisperService";
import { getServerSession } from "next-auth";

export default async function page({ params }: { params: { id: string } }) {
  const whisper = await getWhisperById(params.id);
  const session = await getServerSession();
  return (
    <div className="mx-2 px-4 lg:mx-96 lg:px-40">
      <WhisperContainer whisper={whisper} />
      {session?.user && <WhisperCommentInput whisper={whisper} />}
      <WhispCommentList whisper={whisper} />
    </div>
  );
}
