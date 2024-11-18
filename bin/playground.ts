import lzstring from "lz-string";

export function serializeWorker(code: string): FormData {
	const formData = new FormData();

	const metadata = {
		main_module: "index.js",
	};

	formData.set(
		"index.js",
		new Blob([code], {
			type: "application/javascript+module",
		}),
		"index.js",
	);

	formData.set(
		"metadata",
		new Blob([JSON.stringify(metadata)], { type: "application/json" }),
	);

	return formData;
}

export async function compressWorker(worker: FormData) {
	const serializedWorker = new Response(worker);
	return lzstring.compressToEncodedURIComponent(
		`${serializedWorker.headers.get(
			"content-type",
		)}:${await serializedWorker.text()}`,
	);
}
