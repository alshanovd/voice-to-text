import { NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";

export async function GET(req: Request) {
    const text = await prisma.transcript.findFirst();
    return NextResponse.json(
        text,
        { status: 200 },
    );
}

export async function POST(req: Request) {
    const body = await req.json();
    const respon = await prisma.transcript.create({
        data: {
            fileUrl: body.fileUrl,
            fullText: body.text,
        },
    });
    return NextResponse.json(respon, { status: 200 });
}
