"use server";

import prisma from "../prisma/prisma";
export async function createText(formData: FormData) {
    const data = {
        filename: formData.get("filename") as string,
        fullText: formData.get("fullText") as string,
        fileUrl: formData.get("fileUrl") as string,
    };
    const response = await prisma.transcript.create({ data });

    // if (data.id) {
    //   revalidatePath(`/settings/${response.id}`);
    // } else {
    //   redirect(`/settings/${response.id}`);
    // }
    //   redirect(`/settings`);
}
