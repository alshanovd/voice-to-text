import prisma from "@/prisma/prisma";

export default async function Transcripts() {
    const transcripts = await prisma.transcript.findMany();
    const list = transcripts.map((t) => <p key={t.id}>{t.text}</p>);
    return (
        <div>
            <h1>Transcripts</h1>
            {list}
        </div>
    );
}
