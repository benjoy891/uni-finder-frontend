import Link from "next/link";
import { buildPageHref, type SearchParams } from "@/lib/filters";

const buttonClass = "rounded border px-4/py-2 text-sm";

export default function Pagination({
    params,
    currentPage,
    totalPages,
}: {
    params: SearchParams;
    currentPage: number;
    totalPages: number;
}) {
    if (totalPages <= 1) return null;
    return (
        <nav aria-label="Pagination" className="mt-8 flex items-center justify-between">
            {currentPage > 1 ? (
                <Link href={buildPageHref(params, currentPage - 1)} className={buttonClass}>
                    ← Previous
                </Link>
            ) : (
                <span className={`${buttonClass} opacity-40`}>← Previous</span>
            )}
            {currentPage < totalPages ? (
                <Link href={buildPageHref(params, currentPage + 1)} className={buttonClass}>
                Next →
                </Link>
            ) : (
                <span className={`${buttonClass} opacity-40`}>Next →</span>
            )}
        </nav>
    )
}