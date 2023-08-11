import { uploadFile } from "@/app/services/bucketService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  if (formData) {
    const file = formData.get("media") as File;
    if (file) {
      const resp = await uploadFile(formData);

      return NextResponse.json({
        fileName: resp,
      });
    }

    return NextResponse.json({
      message: "BAD",
    });
  }
}
