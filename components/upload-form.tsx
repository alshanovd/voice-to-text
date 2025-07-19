"use client";
import { Button } from "@heroui/button";
import { InputOtp } from "@heroui/input-otp";
import { Progress } from "@heroui/progress";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AddTextForm } from "./add-text-form";
import { ViewText } from "./view-text";

export const UploadForm = ({
    token,
    envPin,
}: {
    token?: string;
    envPin?: string;
}) => {
    const form = new FormData();
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [pin, setPin] = useState("");
    const [text, setText] = useState("");
    const ref = useRef<HTMLInputElement>(null);
    const [debug, setDebug] = useState(false);

    useEffect(() => {
        const lsPin = localStorage.getItem("pin");
        if (lsPin) {
            setPin(lsPin);
        }

        const debug = localStorage.getItem("debug");
        if (debug) {
            setDebug(true);
        }
    }, []);

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
                if (progressEvent.progress) {
                    setLoadingProgress(progressEvent.progress * 100);
                }
            },
        });
        setText(result.data.text);
        setLoadingProgress(0);
        // reset file input
    };

    const post = async () => {
        await axios("/api/text", {
            method: "POST",
            data: {
                text: "text text",
            },
        });
    };

    const get = async () => {
        await fetch("/api/text", {
            method: "GET",
        });
    };

    const appendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files, "event.target.files");
        // biome-ignore lint/style/noNonNullAssertion: allow here
        form.append("file", event.target.files![0]);
        form.append("model", "whisper-1");
        form.append("response_format", "verbose_json");
    };

    const FileForm = () => (
        <>
            <h1>Please upload a file and press "Go"</h1>
            {debug && (
                <>
                    <Button onPress={post}>post text</Button>
                    <Button onPress={get}>get text</Button>
                </>
            )}
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
                        onValueChange={(value) => {
                            localStorage.setItem("pin", value);
                            setPin(value);
                        }}
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

            {/* <AddTextForm text={text} /> */}
            <ViewText text={text} />
        </>
    );
};
