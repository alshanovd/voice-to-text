"use client";
import { Spinner } from "@heroui/spinner";
import { addToast } from "@heroui/toast";
import axios from "axios";
import moment from "moment";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { PrismaTranscript } from "@/models/transcript";

export default function TranscriptPage() {
    const { id } = useParams();
    const [t, setT] = useState<PrismaTranscript>();
    useEffect(() => {
        axios
            .get("/api/transcript", { params: { id } })
            .then((data) => setT(data.data))
            .catch(() => addToast({ title: "Error on loading" }));
    }, [id]);
    // const { data, isFetching } = useQuery<{ data: PrismaTranscript }>({
    //     queryKey: ["transcript"],
    //     queryFn: () => axios.get("/api/transcript", { params: { id } }),
    // });

    // if (isFetching) {
    //     return <Spinner className="mt-6" />;
    // }
    // const t = (data as { data: PrismaTranscript }).data;
    if (!t) {
        return <Spinner />;
    }
    const duration = moment.utc(0).seconds(t.duration).format("m:ss");
    const createdAt = moment(t.createdAt).format("DD MMM YYYY HH:MM");
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="italic">{createdAt}</h2>
                <span className="text-default-500">Duration: {duration}</span>
            </div>
            <p className="py-4">{t.text}</p>
        </div>
    );
}
