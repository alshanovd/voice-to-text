import axios, { AxiosHeaders } from "axios";
import { useId, useState } from "react";

export const UploadFile = () => {
	const token = process.env.TOKEN;
	const form = new FormData();
	// const [file, setFile] = useState();
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
		form.append("file", event.target.files![0]);
		form.append("model", "whisper-1");
	};

	return (
		<div>
			{token}
			<form action="">
				<input type="file" onChange={(e) => appendFile(e)} id={"some-id"} />
			</form>
			<button type="button" onClick={() => upload()}>
				upload
			</button>
		</div>
	);
};
