import { NextResponse } from "next/server";
import type { GPTTranscript } from "@/models/transcript";
import type { Prisma } from "@/prisma/generated";
import prisma from "../../../prisma/prisma";

type PrismaSegment = Prisma.SegmentUncheckedCreateInput;

export async function POST(req: Request) {
    const body = await req.json();
    const { fileUrl, text, segments, duration } = body as GPTTranscript & {
        fileUrl: string;
    };
    const transcriptRespond = await prisma.transcript.create({
        data: {
            fileUrl,
            text,
            duration,
        },
    });

    const segmentsPrisma: PrismaSegment[] = segments.map((s) => ({
        start: s.start,
        transcriptID: transcriptRespond.id,
        bookmark: false,
        order: s.id,
        updatedAt: new Date(),
        end: s.end,
        text: s.text,
    }));
    const segmentRespond = await prisma.segment.createMany({
        data: segmentsPrisma,
        skipDuplicates: true,
    });
    return NextResponse.json(
        { transcriptRespond, segmentRespond },
        { status: 200 },
    );
}
