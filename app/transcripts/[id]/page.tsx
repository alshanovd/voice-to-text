import moment from "moment";
import type { PrismaTranscript } from "@/models/transcript";
import prisma from "@/prisma/prisma";

export const dynamic = "force-dynamic";

export default async function TranscriptPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const t = (await prisma.transcript.findFirst({
        where: { id: Number(id) },
    })) as PrismaTranscript;
    const duration = moment.utc(0).seconds(t.duration).format("m:ss");
    const createdAt = moment(t.createdAt).format("DD MMM YYYY HH:MM");
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="italic">{createdAt}</h2>
                <span className="text-default-500">Duration: {duration}</span>
            </div>
            <p className="py-4">{t?.text}</p>
        </div>
    );
}
