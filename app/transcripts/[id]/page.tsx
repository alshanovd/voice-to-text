"use client";
import { Skeleton } from "@heroui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useParams } from "next/navigation";
import type { PrismaTranscript } from "@/models/transcript";

export default function TranscriptPage() {
    const { id } = useParams();
    const { data, isLoading } = useQuery<{ data: PrismaTranscript }>({
        queryKey: ["transcript"],
        queryFn: () => axios.get("/api/transcript", { params: { id } }),
    });
    if (isLoading) {
        return (
            <Skeleton className="rounded-lg w-400">
                <div className="h-5 rounded-lg bg-default-300" />
            </Skeleton>
        );
    }
    const t = (data as { data: PrismaTranscript }).data;
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
