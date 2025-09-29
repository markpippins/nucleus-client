import axios from "axios";

const API_URL = "http://127.0.0.1:8000/fs";

export interface RequestPayload {
  alias: string;
  path: string[];
  operation: string;
  filename?: string;
  new_name?: string;
}

export async function callApi(payload: RequestPayload) {
  const res = await axios.post(API_URL, payload);
  return res.data;
}
