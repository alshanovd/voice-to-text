import axios from "axios";
import { createText } from "@/actions/AddTextAction";
import { AddTextComponent } from "./add-text";

export const UploadForm = ({ token }: { token?: string }) => {
	const form = new FormData();
	const upload = async () => {
		await axios({
			method: "post",
			url: "https://api.openai.com/v1/audio/translations",
			data: form,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		});
	};
	const appendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.files, "event.target.files");
		// biome-ignore lint/style/noNonNullAssertion: allow here
		form.append("file", event.target.files![0]);
		form.append("model", "whisper-1");
	};

	return (
		<>
			{/* <form action="">
				<input
					type="file"
					onChange={(e) => appendFile(e)}
					id={"some-id"}
					accept=".mp3,audio/*,mp4"
				/>
			</form>
			<button type="button" onClick={() => upload()}>
				upload
			</button> */}

			<form action={createText}>
				<input type="text" name="filename" />
				<input type="text" name="datetime" />
				<input type="text" name="fullText" />
				<button type="submit">submit</button>
			</form>

			<AddTextComponent />
		</>
	);
};
