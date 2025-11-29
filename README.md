# Voice-to-Text — Audio Transcription Web Application

Voice-to-Text is a lightweight single-page web application built on Next.js that converts audio files (voice messages, MP3, MP4, etc.) to written text using OpenAI’s Whisper model. The application provides a simple upload UI, a progress indicator for uploads and translations, basic access control via a 4-digit PIN, and persistent storage of the transcribed text using Prisma/PostgreSQL and Vercel Blob for file hosting.

Live demo: https://voice-to-text-wine.vercel.app/

## Key Features
- Upload an audio file (MP3, MP4, or audio/*) from the browser
- Convert audio to text using OpenAI Whisper (model: whisper-1)
- Upload and store audio files on Vercel Blob
- Persist transcription results with Prisma and PostgreSQL
- Accessible user interface built with HeroUI and Tailwind CSS
- Progress indicators for file upload and conversion

## Technologies
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS & Tailwind Variants
- HeroUI components
- Prisma (+ PostgreSQL) for data persistence
- Axios for HTTP requests
- Vercel Blob API for file hosting
- OpenAI Whisper via the OpenAI Translations endpoint
- Framer Motion and next-themes for UI polish

## Architecture Overview
1. The client presents a file input and a simple PIN gate.
2. Selected audio files are uploaded to the OpenAI Translations endpoint (model=whisper-1) with an API key provided through an environment variable.
3. After transcription, the application uploads the audio file to Vercel Blob and stores the transcription text and the resulting file URL in a PostgreSQL database via Prisma.
4. A minimal API route (/api/text) and server actions provide text persistence and retrieval.

## Debugging and Utility Scripts
- `npm run dev` — start the development server
- `npm run build` — generate Prisma client and build the Next.js app
- `npm run start` — start the built app
- `npm run lint` — run ESLint with auto fix
- `npm run generate` — Prisma generate (client code)

## Usage
1. Launch the application and open it in a browser at http://localhost:3000.
2. Enter the configured 4-digit PIN to enable the upload form.
3. Select a supported audio file and press the "Go" button.
4. The app uploads the file for translation to OpenAI Whisper; once returned, it stores the transcription text in the app's database and uploads the audio to Vercel Blob (public URL).

## Deployment
This project is ready to be deployed to Vercel. Make sure to set the following environment variables on the hosting platform:
- `TOKEN` (OpenAI API key)
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob token)
- `PIN` (4-digit PIN string)
- `DATABASE_URL` (PostgreSQL connection string)

## Contributing
Contributions are welcome. If you'd like to contribute, please fork the repository, create a feature branch, and submit a pull request with a clear description. For larger changes, open an issue first to discuss the proposed modifications.

## License
This project is distributed under the MIT License. See the top-level `LICENSE` file for details.
