import { createSignal, For, Show } from "solid-js";
import { uploadFilesViaBroker } from "../../services/upload-broker";
import type { FileUploadResult } from "../../models/file";

export default function MultiFileUploadComponent() {
  const [files, setFiles] = createSignal<File[]>([]);
  const [results, setResults] = createSignal<FileUploadResult[]>([]);
  const [uploading, setUploading] = createSignal(false);
  let fileInput!: HTMLInputElement;

  const handleFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target?.files?.length) {
      setFiles(Array.from(target.files));
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.length) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const uploadAll = async () => {
    if (files().length === 0) return;
    setUploading(true);
    const res = await uploadFilesViaBroker("solid-ts-social-client", files());
    setResults(res);
    setUploading(false);
  };

  const clearAll = () => {
    setFiles([]);
    setResults([]);
    fileInput.value = "";
  };

  return (
    <div
      class="w-full max-w-md p-4 border rounded-lg bg-white shadow-sm"
      style={{ width: "33%" }}
    >
      <h3 class="text-lg font-semibold mb-2">Upload Files</h3>

      <div
        class="border-2 border-dashed rounded-md p-3 text-sm text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
        onClick={() => fileInput.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          multiple
          class="hidden"
          ref={(el) => (fileInput = el)}
          onChange={handleFileSelect}
        />
        <p>Drag & drop files here or click to select</p>
      </div>

      <Show when={files().length > 0}>
        <div class="mt-3 space-y-1 text-sm text-gray-700">
          <For each={files()}>{(file) => <div>{file.name}</div>}</For>
        </div>

        <div class="mt-3 flex gap-2">
          <button
            class="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={uploadAll}
            disabled={uploading()}
          >
            {uploading() ? "Uploading..." : "Upload"}
          </button>
          <button
            class="px-3 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={clearAll}
            disabled={uploading()}
          >
            Clear
          </button>
        </div>
      </Show>

      <Show when={results().length > 0}>
        <div class="mt-4 text-sm">
          <For each={results()}>
            {(result) => (
              <div class={result.success ? "text-green-600" : "text-red-600"}>
                {result.file.name}:{" "}
                {result.success
                  ? `✅ ${result.filename}`
                  : `❌ ${result.error}`}
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}