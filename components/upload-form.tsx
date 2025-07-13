"use client";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import axios from "axios";
import { useRef, useState } from "react";
import { AddTextForm } from "./add-text-form";
import { ViewText } from "./view-text";

export const UploadForm = ({ token }: { token?: string }) => {
    const form = new FormData();
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [text, setText] = useState("");
    const ref = useRef<HTMLInputElement>(null);

    const upload = async () => {
        const result = await axios<{ text: string }>({
            method: "post",
            url: "https://api.openai.com/v1/audio/translations",
            data: form,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress(progressEvent) {
                console.log(progressEvent, "progressEvent");
                if (progressEvent.progress) {
                    setLoadingProgress(progressEvent.progress * 100);
                }
            },
        });
        setText(result.data.text);
        setLoadingProgress(0);
        // reset file input
    };
    const appendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files, "event.target.files");
        // biome-ignore lint/style/noNonNullAssertion: allow here
        form.append("file", event.target.files![0]);
        form.append("model", "whisper-1");
    };

    return (
        <>
            <h1>Please upload a file and press "Go"</h1>
            <div>
                <input
                    type="file"
                    onChange={(e) => appendFile(e)}
                    id={"some-id"}
                    accept=".mp3,audio/*,mp4"
                    ref={ref}
                />
                <Button color="primary" type="submit" onClick={() => upload()}>
                    Go
                </Button>
            </div>

            <Progress
                isStriped={loadingProgress !== 100}
                aria-label="Loading..."
                className="max-w-md"
                color="secondary"
                isIndeterminate={loadingProgress === 100}
                value={loadingProgress}
            />

            <AddTextForm text={text} />
            <ViewText text={text} />
        </>
    );
};
