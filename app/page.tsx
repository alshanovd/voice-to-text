import { UploadFile } from "@/components/upload-file";

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            {/* <h1> Main page</h1> */}
            <UploadFile />
        </section>
    );
}
