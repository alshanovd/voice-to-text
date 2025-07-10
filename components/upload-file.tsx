"use client";
import axios, { AxiosHeaders } from "axios";
import { useId, useState } from "react";

export const UploadFile = () => {
	const token = process.env.TOKEN;
	const form = new FormData();
	// const [file, setFile] = useState();
	const upload = async () => {
		await axios.post(
			"https://api.openai.com/v1/audio/translations",
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			},
		);
	};
	const appendFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		form.append("file", event.target.files![0]);
	};

	return (
		<div>
			{token}
			<form action="">
				<input
					type="file"
					onChange={(e) => appendFile(e)}
					name="file"
					id={"some-id"}
				/>
			</form>
			<button type="button" onClick={() => upload()}>
				upload
			</button>
		</div>
	);
};
