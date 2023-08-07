import { Storage } from "@google-cloud/storage";

const storage = new Storage();
const bucket = storage.bucket("local-whisper-bucket");

export const uploadFile = (file: File) => {
  return new Promise(async (resolve, reject) => {
    const writeStream = bucket.file(file.name).createWriteStream();
    const fileBuffer = await file.arrayBuffer();

    writeStream.on("error", (err) => {
      console.error(err);
    });

    writeStream.on("finish", () => {
      console.log("Upload finished!");
      bucket.file(file.name).makePublic();
      resolve("OK");
    });
    writeStream.end(Buffer.from(fileBuffer));
  });
};