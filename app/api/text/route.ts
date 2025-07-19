import { NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";

type ResponseData = {
    message: string;
};

export async function GET(req: Request) {
    return NextResponse.json(
        { message: "GET Hello from Next.js!" },
        { status: 200 },
    );
}

export async function POST(req: Request) {
    const body = await req.json();
    const respon = await prisma.text.create({
        data: {
            filename: "test",
            fullText: body.text,
        },
    });
    return NextResponse.json(respon, { status: 200 });
}
