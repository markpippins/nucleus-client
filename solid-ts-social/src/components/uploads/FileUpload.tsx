import { createSignal, onCleanup } from "solid-js";
import { Dropzone } from "./DropZone";
import { UploadControls } from "./UploadControls";
import { StatusMessage } from "./StatusMessage";

const UPLOAD_URL = "/api/upload/submitRequestWithFile";

export default function FileUpload() {
  const [file, setFile] = createSignal<File | null>(null);
  const [isDragging, setIsDragging] = createSignal(false);
  const [message, setMessage] = createSignal<string | null>(null);
  const [uploading, setUploading] = createSignal(false);
  let fileInput: HTMLInputElement | undefined;

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
    if (dt?.files?.length) {
      setFile(dt.files[0]);
      dt.clearData();
    }
  };

  const handleFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target?.files?.length) {
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
      form.append("requestId", crypto.randomUUID());
      form.append("file", file()!, file()!.name);

      const res = await fetch(UPLOAD_URL, { method: "POST", body: form });
      const txt = await res.text();

      if (!res.ok) {
        setMessage(`Upload failed: ${res.status} ${res.statusText} — ${txt}`);
      } else {
        setMessage(`Upload succeeded: ${txt}`);
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

  onCleanup(() => setIsDragging(false));

  return (
    // <div class="file-upload max-w-md w-full mx-auto">
    <div class="file-upload">
    {/* <div class="max-w-xl mx-auto"> */}
      <Dropzone
        file={file()}
        isDragging={isDragging()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInput?.click()}
        onFileSelect={handleFileSelect}
        fileInputRef={(el) => (fileInput = el)}
      />

      <UploadControls
        uploading={uploading()}
        fileSelected={!!file()}
        onUpload={uploadFile}
        onClear={clearFile}
      />

      <StatusMessage message={message()} />
    </div>
  );
}