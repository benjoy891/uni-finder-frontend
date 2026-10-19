import { Suspense } from "react";
import Link from "next/link";
import FilterForm from "@/components/FilterForm";
import StatusBadge from "@/components/StatusBadge";
import { apiGet } from "@/lib/api";
import { buildApiQuery, type SearchParams } from "@/lib/filters";
import type { UniversityListResponse } from "@/lib/types";


async function UniversityList({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) {
    const query = buildApiQuery(await searchParams);
    const json = await apiGet<UniversityListResponse>(
        `/users/universities/${query ? `?${query}` : ""}`
    );

    if (json.data.length === 0) {
        return <p className="text-gray-500">No programs match your filters.</p>;
    }

    return (
        <>
            <p className="mb-4 text-sm text-gray-500">
                {json.pagination.total_docs} programs found
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