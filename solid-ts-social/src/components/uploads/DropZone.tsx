import type { JSX } from "solid-js";

export function Dropzone(props: {
    ref?: HTMLDivElement;
    file: File | null;
    isDragging: boolean;
    onDragOver: (e: DragEvent) => void;
    onDragLeave: (e: DragEvent) => void;
    onDrop: (e: DragEvent) => void;
    onClick: () => void;
    onFileSelect: (e: Event) => void;
    fileInputRef: (el: HTMLInputElement) => void;
}) {
    return (
        <div
            ref={props.ref}
            classList={{
                "border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black": true,
                "border-blue-400": props.isDragging,
                "border-gray-600": !props.isDragging,
            }}
            onDragOver={props.onDragOver}
            onDragLeave={props.onDragLeave}
            onDrop={props.onDrop}
            onClick={props.onClick}
            aria-label="File dropzone"
        >
            <input
                type="file"
                class="hidden"
                ref={props.fileInputRef}
                onChange={props.onFileSelect}
            />

            <svg class="w-6 h-6 text-white mb-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16l5-5 5 5M12 11v10" /></svg>

            {props.file ? (
                <>
                    <p class="text-base font-semibold text-black">{props.file.name}</p>
                    <p class="text-xs text-black">{Math.round(props.file.size / 1024)} KB</p>
                </>
            ) : (
                <>
                    <p class="text-base font-semibold text-black">Drag & drop a file here</p>
                    <p class="text-xs text-black">or click to browse</p>
                </>
            )}
        </div>
    );
}