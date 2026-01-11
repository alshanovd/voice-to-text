"use client";
import { Button } from "@heroui/button";
import { InputOtp } from "@heroui/input-otp";
import { Progress } from "@heroui/progress";
import { addToast, ToastProvider } from "@heroui/toast";
import { put } from "@vercel/blob";
import axios from "axios";
import { useRef, useState } from "react";
import { useDebug } from "@/hooks/use-debug";
import { usePin } from "@/hooks/use-pin";
import type { GPTSegment, GPTTranscript } from "@/models/transcript";
import { ViewText } from "./view-text";

export const UploadForm = ({
    token,
    fileToken,
    envPin,
}: {
    token?: string;
    fileToken?: string;
    envPin?: string;
}) => {
    const [form, setForm] = useState(new FormData());
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const ref = useRef<HTMLInputElement>(null);
    const debug = useDebug();
    const [file, setFile] = useState<FileList[number]>();
    const [pin, setPinValue] = usePin();

    const saveTranscript = async (
        { segments, duration, text }: GPTTranscript,
        fileUrl: string,
    ) => {
        await axios("/api/transcript", {
            method: "POST",
            data: { text, fileUrl, segments, duration },
        });
    };

    const upload = async () => {
        try {
            const result = await axios<GPTTranscript>({
                method: "post",
                url: "https://api.openai.com/v1/audio/translations",
                data: form,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress(progressEvent) {
                    if (progressEvent.progress) {
                        setLoadingProgress(progressEvent.progress * 100);
                    }
                },
            });
            setDisplayText(result.data.text);
            const { url } = await put(
                `${String(Date.now())}-${file?.name}`,
                // biome-ignore lint/style/noNonNullAssertion: allow this file variable
                file!,
                {
                    access: "public",
                    token: fileToken,
                },
            );
            await saveTranscript(result.data, url);
            console.log(url, "url");
            setLoadingProgress(0);
        } catch (err) {
            setLoadingProgress(0);
            setFile(undefined);
            addToast({
                title: "Error",
                description: "File is not uploaded. Refresh the page",
                color: "danger",
            });
        }
        // reset file input
    };

    const get = async () => {
        await fetch("/api/transcript", {
            method: "GET",
        });
    };

    const appendFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files, "event.target.files");
        setFile(() => (event.target.files as FileList)[0]);

        const newForm = new FormData();
        // biome-ignore lint/style/noNonNullAssertion: allow here
        newForm.append("file", event.target.files![0]);
        newForm.append("model", "whisper-1");
        newForm.append("response_format", "verbose_json");
        setForm(newForm);
        addToast({
            title: "File added",
            description: "Press Go to process the file",
        });
    };

    const FileForm = () => (
        <>
            <h1>Please upload a file and press "Go"</h1>
            {debug && (
                <>
                    {/* <Button onPress={post}>post text</Button> */}
                    <Button onPress={get}>get text</Button>
                </>
            )}
            <div>
                {file ? (
                    <div className="mr-6">File is chosen: {file.name}</div>
                ) : (
                    <div>
                        <input
                            type="file"
                            onChange={(e) => appendFile(e)}
                            id={"some-id"}
                            accept=".mp3,audio/*,mp4"
                            ref={ref}
                            className="mr-6 w-[220px]"
                        />
                    </div>
                )}
                <div className="flex justify-center">
                    <Button
                        color="primary"
                        type="submit"
                        className="mt-6"
                        onPress={() => upload()}
                    >
                        Go
                    </Button>
                </div>
            </div>
        </>
    );
    return (
        <>
            {envPin === pin ? (
                <FileForm />
            ) : (
                <>
                    <h2>Enter PIN</h2>
                    <InputOtp
                        length={4}
                        value={pin}
                        onValueChange={(value) => setPinValue(value)}
                    />
                </>
            )}

            <Progress
                isStriped={loadingProgress !== 100}
                aria-label="Loading..."
                className="max-w-md"
                color="secondary"
                isIndeterminate={loadingProgress === 100}
                value={loadingProgress}
            />

            <h2>
                {loadingProgress > 0 &&
                    loadingProgress < 100 &&
                    "Uploading File"}
                {loadingProgress === 100 && "Converting Audio to Text"}
            </h2>

            <ViewText text={displayText} />
        </>
    );
};
