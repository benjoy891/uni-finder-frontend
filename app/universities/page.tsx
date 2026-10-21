import { Suspense } from "react";
import Link from "next/link";
import FilterForm from "@/components/FilterForm";
import StatusBadge from "@/components/StatusBadge";
import { apiGet } from "@/lib/api";
import { buildApiQuery, type SearchParams, getPage } from "@/lib/filters";
import type { UniversityListResponse } from "@/lib/types";
import Pagination from "@/components/Pagination";

async function UniversityList({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;
    const page = getPage(params);
    const query = buildApiQuery(params, page);
    const json = await apiGet<UniversityListResponse>(
        `/users/universities/${query ? `?${query}` : ""}`
    );

    const { current_page, per_page, total_docs, total_pages } = json.pagination;
    if (json.data.length === 0) {
        return <p className="text-gray-500">No programs match your filters.</p>;
    }
    const first = (current_page - 1) * per_page + 1;
    const last = first + json.data.length - 1;
    return (
        <>
            <p className="mb-4 text-sm text-gray-500">
                Showing {first}–{last} of {total_docs} programs
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
                {json.data.map((item) => (
                    <li key={item.id}>
                        <Link
                            href={`/universities/${item.id}`}
                            className="block rouned-lg border p-4 transition hover:border-blue-500"
                            >
                            <h2 className="text-lg font-semibold">{item.name}</h2>
                            <p className="text-gray-600">{item.program_name}</p>
                            <p className="mt-1 text-sm text-gray-500">
                                {item.city}, {item.country}
                            </p>
                            <div className="mt-3">
                                <StatusBadge status={item.status}/>
                            </div>   
                        </Link>
                    </li>
                ))}
            </ul>
            <Pagination 
            params={params}
            currentPage={current_page}
            totalPages={total_pages}
            />
        </>

    );
}

export default function UniversitiesPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    return (
        <main className="mx-auto max-w-4xl p-8">
            <h1 className="mb-6 text-3xl font-bold">Universities</h1>
            <Suspense>
                <FilterForm />
            </Suspense>
            <Suspense fallback={<p>Loading universities....</p>}>
                <UniversityList searchParams={searchParams} />
            </Suspense>
        </main>
    )
}