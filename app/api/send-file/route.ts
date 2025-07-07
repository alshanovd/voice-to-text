const OpenAI = require("openai");
const apiKey = process.env.TOKEN;
const openai = new OpenAI({ apiKey });

async function voiceToText(file: FormData) {
	const transcription = await openai.audio.transcriptions.create({
		file: file.get("myFile"),
		model: "whisper-1",
		language: "en",
	});

	return transcription;
}

export async function ProcessFile(form: FormData) {
	const result = await voiceToText(form);
	return result;
}
