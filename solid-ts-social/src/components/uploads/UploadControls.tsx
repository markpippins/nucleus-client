export function UploadControls(props: {
  uploading: boolean;
  fileSelected: boolean;
  onUpload: () => void;
  onClear: () => void;
}) {
  return (
    <div class="file-upload-controls mt-4 flex items-center gap-3">
      <button
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
        onClick={props.onUpload}
        disabled={!props.fileSelected || props.uploading}
      >
        {props.uploading && (
          <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4L6 12z"></path>
          </svg>
        )}
        Upload
      </button>

      <button
        class="px-3 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
        onClick={props.onClear}
        disabled={props.uploading}
      >
        Clear
      </button>

      <span class="ml-auto text-sm text-gray-500">Max: configured on server</span>
    </div>
  );
}