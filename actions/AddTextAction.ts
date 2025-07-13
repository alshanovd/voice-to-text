"use server";

import { PrismaClient } from "../prisma";

const prisma = new PrismaClient();
export async function createText(formData: FormData) {
    const data = {
        filename: formData.get("filename") as string,
        fullText: formData.get("fullText") as string,
    };
    const response = await prisma.text.create({ data });
    // if (data.id) {
    //   revalidatePath(`/settings/${response.id}`);
    // } else {
    //   redirect(`/settings/${response.id}`);
    // }
    //   redirect(`/settings`);
}
