// import moment from "moment";
// import { notFound } from "next/navigation";
// import prisma from "@/prisma/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function TranscriptPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    // const t = await prisma.transcript.findFirst({
    //     where: { id: Number(id) },
    // });
    // if (!t) {
    //     notFound();
    // }
    // const duration = moment.utc(0).seconds(t.duration).format("m:ss");
    // const createdAt = moment(t.createdAt).format("DD MMM YYYY HH:MM");
    // return (
    //     <div>
    //         <div className="flex justify-between">
    //             <h2 className="italic">{createdAt}</h2>
    //             <span className="text-default-500">Duration: {duration}</span>
    //         </div>
    //         <p className="py-4">{t?.text}</p>
    //     </div>
    // );
    return id;
}
