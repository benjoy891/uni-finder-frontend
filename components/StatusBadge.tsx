import { STATUS_OPTIONS, labelFor } from "@/lib/filters";

const STYLES: Record<string, string> = {
  OPEN: "bg-green-100 text-green-800",
  OPENING_SOON: "bg-yellow-100 text-yellow-800",
  CLOSED: "bg-red-100 text-red-800",
};

export default function StatusBadge({ status }: { status: string }) {
  const style = STYLES[status] ?? "bg-gray-100 text-gray-800";
  return (
    <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${style}`}>
      {labelFor(STATUS_OPTIONS, status)}
    </span>
  );
}