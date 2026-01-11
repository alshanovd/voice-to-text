import type { Prisma } from "@/prisma/generated";

export interface GPTSegment {
    avg_logprob: number;
    compression_ratio: number;
    end: number;
    id: number;
    no_speech_prob: number;
    seek: number;
    start: number;
    temperature: number;
    text: string;
}
export interface GPTTranscript {
    duration: number;
    language: string;
    segments: GPTSegment[];
    task: string;
    text: string;
}

export type PrismaTranscript = Prisma.TranscriptGetPayload<null>;
