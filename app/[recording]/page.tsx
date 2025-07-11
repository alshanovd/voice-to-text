"use client";
import { useParams } from "next/navigation";

export default function HistoryPage() {
	const param = useParams();
	return (
		<div>
			<h1>Recording</h1>
			<h2> {param.recording}</h2>
		</div>
	);
}
