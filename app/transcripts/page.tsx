import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import moment from "moment";
import Link from "next/link";
import type { ReactNode } from "react";
import type { PrismaTranscript } from "@/models/transcript";
import prisma from "@/prisma/prisma";

export function Transcript({ t }: { t: PrismaTranscript }): ReactNode {
    const duration = moment.utc(0).seconds(t.duration).format("m:ss");
    const createdAt = moment(t.createdAt).format("DD MMM YYYY HH:MM");
    return (
        <Link href={`/transcripts/${t.id}`}>
            <Card className="max-w-[400px] hover:scale-105 hover:cursor-pointer hover:bg-default-100">
                <CardHeader className="flex justify-between">
                    <div className="flex flex-col italic text-md">
                        {createdAt}
                    </div>
                    <div className="text-small text-default-500">
                        Duration: {duration}
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p className="truncate">{t.text}</p>
                </CardBody>
                <Divider />
            </Card>
        </Link>
    );
}

export default async function Transcripts() {
    const transcripts = await prisma.transcript.findMany();
    const list = transcripts.map((t) => <Transcript t={t} key={t.id} />);
    return <div className="flex flex-col gap-5">{list}</div>;
}
