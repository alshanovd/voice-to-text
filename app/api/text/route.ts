import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "../../../prisma/prisma";

type ResponseData = {
    message: string;
};

export async function GET(req: NextApiRequest) {
    return NextResponse.json(
        { message: "GET Hello from Next.js!" },
        { status: 200 },
    );
}

export async function POST(req: NextApiRequest) {
    const respon = await prisma.text.create({
        data: {
            filename: "test",
            fullText: req.body.text,
            createdAt: new Date().toISOString(),
        },
    });
    return NextResponse.json(respon, { status: 200 });
}
