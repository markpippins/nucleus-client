import { createSignal, onCleanup } from "solid-js";

const UPLOAD_URL = "/api/upload/submitRequestWithFile";

export default function FileUpload() {
  // Reactive state using Solid's signals
  const [file, setFile] = createSignal<File | null>(null);
  const [isDragging, setIsDragging] = createSignal(false);
  const [message, setMessage] = createSignal<string | null>(null);
  const [uploading, setUploading] = createSignal(false);
  let fileInput: HTMLInputElement | undefined;

  // Event handlers
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dt = e.dataTransfer;
    if (dt?.files && dt.files.length > 0) {
      setFile(dt.files[0]);
      dt.clearData();
    }
  };

  const handleFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target?.files && target.files.length > 0) {
      setFile(target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file()) {
      setMessage("No file selected");
      return;
    }
    setUploading(true);
    setMessage(null);

    try {
      const form = new FormData();
      form.append("service", "uploadService");
      form.append("operation", "processFile");
      form.append("params", JSON.stringify({}));
      form.append("file", file() as File, file()!.name);

      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        body: form,
      });

      const txt = await res.text();
      if (!res.ok) {
        setMessage(`Upload failed: ${res.status} ${res.statusText} — ${txt}`);
      } else {
        setMessage(`Upload succeeded: ${txt}`);
        // Optionally clear selection:
        // setFile(null);
      }
    } catch (err: any) {
      setMessage(`Upload error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setMessage(null);
    if (fileInput) fileInput.value = "";
  };

  // Cleanup handler if needed (not strictly required here)
  onCleanup(() => setIsDragging(false));

  return (
    <div class="max-w-xl mx-auto">
      <div
        classList={{
          "border-2": true,
          "border-dashed": true,
          "rounded-2xl": true,
          "p-4": true,
          "flex": true,
          "flex-col": true,
          "items-center": true,
          "justify-center": true,
          "cursor-pointer": true,
          "transition": true,
          "border-blue-500": isDragging(),
          "bg-blue-50": isDragging(),
          "border-gray-300": !isDragging(),
          "bg-white": !isDragging(),
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInput?.click()}
        aria-label="File dropzone"
      >
        <input
          type="file"
          class="hidden"
          ref={fileInput}
          onChange={handleFileSelect}
        />

        <svg class="w-6 h-6 text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16l5-5 5 5M12 11v10" />
        </svg>

        {file() ? (
          <>
            <p class="text-base font-semibold text-gray-900">{file()!.name}</p>
            <p class="text-xs text-gray-500">{Math.round(file()!.size / 1024)} KB</p>
          </>
        ) : (
          <>
            <p class="text-base font-semibold text-gray-900">Drag &amp; drop a file here</p>
            <p class="text-xs text-gray-500">or click to browse</p>
          </>
        )}
      </div>

      <div class="mt-4 flex items-center gap-3">
        <button
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          onClick={uploadFile}
          disabled={!file() || uploading()}
        >
          {uploading() && (
            <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4L6 12z"></path>
            </svg>
          )}
          Upload
        </button>

        <button
          class="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
          onClick={clearFile}
          disabled={uploading()}
        >
          Clear
        </button>

        <span class="ml-auto text-sm text-gray-500">Max: configured on server</span>
      </div>

      {message() && (
        <div class="mt-3 p-3 rounded-md bg-blue-100 text-sm text-blue-800 shadow-sm">
          {message()}
        </div>
      )}
    </div>
  );
}
