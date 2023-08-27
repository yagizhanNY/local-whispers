import WhisperContainer from "@/app/components/WhisperContainer";
import WhispCommentList from "@/app/components/whisper-comment/WhispCommentList";
import WhisperCommentInput from "@/app/components/whisper-comment/WhisperCommentInput";
import { getWhisperById } from "@/app/services/whisperService";

export default async function page({ params }: { params: { id: string } }) {
  const whisper = await getWhisperById(params.id);
  return (
    <div className="mx-2 px-4 lg:mx-96 lg:px-40">
      <WhisperContainer whisper={whisper} />
      <WhisperCommentInput whisper={whisper} />
      <WhispCommentList whisper={whisper} />
    </div>
  );
}
