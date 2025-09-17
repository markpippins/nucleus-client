export function StatusMessage(props: { message: string | null }) {
  return props.message ? (
    <div class="mt-3 p-3 rounded-md bg-blue-100 text-sm text-blue-800 shadow-sm">
      {props.message}
    </div>
  ) : null;
}