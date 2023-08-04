import Image from "next/image";

type PageProps = {
  image: string | null | undefined;
};

export default function WhisperImage({ image }: PageProps) {
  return (
    <div>
      {image && (
        <Image
          width={32}
          height={32}
          quality={100}
          src={image}
          alt="profile picure"
          className="rounded-full"
        ></Image>
      )}
    </div>
  );
}
