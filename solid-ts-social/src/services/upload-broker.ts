import type { FileUploadResult } from '../models/file';

const UPLOAD_URL = "/api/upload/submitRequestWithFile";

export async function uploadFilesViaBroker(
    clientId: string,
    files: File[]
): Promise<FileUploadResult[]> {
    const results: FileUploadResult[] = [];

    for (const file of files) {
        const requestId = `${clientId}-${Date.now()}-${file.name}`;

        const form = new FormData();
        form.append("service", "uploadService");
        form.append("operation", "processFile");
        form.append("params", JSON.stringify({}));
        form.append("file", file, file.name);
        form.append("requestId", requestId);

        try {
            const res = await fetch(UPLOAD_URL, {
                method: "POST",
                body: form,
            });

            const json = await res.json();

            if (res.ok && json.ok && typeof json.data === "string") {
                results.push({
                    file,
                    requestId,
                    success: true,
                    filename: json.data,
                });
            } else {
                const errorMsg = json.errors?.[0]?.message || "Unknown error";
                results.push({
                    file,
                    requestId,
                    success: false,
                    error: errorMsg,
                });
            }
        } catch (err: any) {
            results.push({
                file,
                requestId,
                success: false,
                error: err.message || "Network error",
            });
        }
    }

    return results;
}