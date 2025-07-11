import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function POST(req: Request) {
	const { filename, datetime, fullText } = await req.json();

	let result: unknown;
	try {
		result = await prisma.text.create({
			data: { filename, datetime, fullText },
		});
		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
