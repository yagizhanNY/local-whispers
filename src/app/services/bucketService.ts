import { Storage } from "@google-cloud/storage";
import { UploadMediaRequest } from "../model/uploadMediaRequest";

const gcKeyText = process.env.NEXT_PUBLIC_GC_KEY;
const gcKey = JSON.parse(atob(gcKeyText!));
const storage = new Storage({
  projectId: gcKey.project_id,
  credentials: gcKey,
});
const bucket = storage.bucket("local-whisper-bucket");

export const uploadFile = (formData: FormData) => {
  return new Promise(async (resolve, reject) => {
    const file = formData.get("media") as File;
    const id = formData.get("id") as string;
    const writeStream = bucket.file(id + file.name).createWriteStream();
    const fileBuffer = await file.arrayBuffer();

    writeStream.on("error", (err) => {
      console.error(err);
    });

    writeStream.on("finish", () => {
      console.log("Upload finished!");
      bucket.file(id + file.name).makePublic();
      resolve(id + file.name);
    });
    writeStream.end(Buffer.from(fileBuffer));
  });
};
