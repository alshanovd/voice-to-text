import { NextResponse } from "next/server";
import type { GPTSegment } from "@/models/translation";
import prisma from "../../../prisma/prisma";

type PrismaSegment = Partial<typeof prisma.segment.fields>;

export async function GET(req: Request) {
    const text = await prisma.transcript.findMany();
    return NextResponse.json(text, { status: 200 });
}

export async function POST(req: Request) {
    const body = await req.json();
    const { fileUrl, text, segments, duration } = body as {
        fileUrl: string;
        segments: GPTSegment[];
        duration: number;
        text: string;
    };
    const translationRespond = await prisma.transcript.create({
        data: {
            fileUrl,
            text,
            duration,
        },
    });
    // const segms: PrismaSegment[] = segments.map((s) => ({
    //     start: s.start,
    //     transcriptID: translationRespond.id,
    //     bookmark: false,
    //     order: s.id,
    //     updatedAt: new Date(),
    //     end: s.end,
    //     text: s.text,
    // }));
    // const segmentRespond = await prisma.segment.createMany(segms);
    return NextResponse.json(translationRespond, { status: 200 });
}
