"use server";

import { PrismaClient } from "@/prisma/generated";

const prisma = new PrismaClient();
export async function createText(formData: FormData) {
    const data = {
        filename: "filename",
        datetime: new Date().toISOString(),
        fullText: "text text",
    };
    const response = await prisma.text.create({ data });
    // if (data.id) {
    //   revalidatePath(`/settings/${response.id}`);
    // } else {
    //   redirect(`/settings/${response.id}`);
    // }
    //   redirect(`/settings`);
}
