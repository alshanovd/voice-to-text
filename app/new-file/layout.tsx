export default function HistoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className="text-3xl mb-6">New File</h1>
                {children}
            </div>
        </section>
    );
}
