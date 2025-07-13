import { useEffect, useRef } from "react";
import { createText } from "@/actions/AddTextAction";

export const AddTextForm = ({ text }: { text: string }) => {
    const ref = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if (text.length) ref.current?.click();
    }, [text]);
    return (
        <form action={createText}>
            <input type="text" name="filename" />
            <input type="text" name="datetime" />
            {/* <textarea name="fullText" value={text}></textarea> */}
            <textarea name="fullText"></textarea>
            <button type="submit" ref={ref}>
                submit
            </button>
        </form>
    );
};
