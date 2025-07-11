import prisma from "@/prisma/prisma";

export async function createFlatAction(_: unknown, formData: FormData) {
	const data = {
		filename: "filename",
		datetime: Date(),
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
