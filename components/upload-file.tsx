"use client";
import axios, { AxiosHeaders } from "axios";
import { useId, useState } from "react";

export const UploadFile = () => {
	const token = process.env.TOKEN;
	const [file, setFile] = useState();
	const upload = axios.post(
		"https://api.openai.com/v1/audio/translations",
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		},
	);

	return (
		<div>
			{token}
			<input type="file" name="file" id={useId()} />
		</div>
	);
};
