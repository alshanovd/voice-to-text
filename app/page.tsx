export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<form
				action="http://localhost:4000/upload"
				method="POST"
				encType="multipart/form-data"
			>
				<input type="file" name="myFile" />
				<button type="submit">Upload</button>
			</form>
		</section>
	);
}
