export interface FileUploadResult {
  file: File;
  requestId: string;
  success: boolean;
  filename?: string;
  error?: string;
}