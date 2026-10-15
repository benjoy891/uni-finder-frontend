import { Suspense } from "react";
import type { UniversityListResponse } from "@/lib/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FilterForm from "@/components/FilterForm";
import { buildApiQuery, type SearchParams } from "@/lib/filters";

async function UniversityList({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;
    const query = buildApiQuery(params);
    const token = (await cookies()).get("access_token")?.value;
    if (!token) redirect("/login");

    const url = `${process.env.API_URL}/users/universities/${query ? `?${query}` : ""}`;
    const res = await fetch(url, {
        headers: {Authorization: `Bearer ${token}`},
    });
    if (res.status === 401) redirect("/login");
    if (!res.ok) throw new Error("Failed to load universities");

    const json: UniversityListResponse = await res.json();

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
                    <li key={item.id} className="rounded-lg border p-4">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-gray-600">{item.program_name}</p>
                        <p className="mt-1 text-sm text-gray-500">
                            {item.city}, {item.country}
                        </p>
                        <span className={`mt-3 inline-block rounded px-2 py-1 text-xs font-medium 
                            ${item.status === "OPEN"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                            >
                            {item.status}
                        </span>
                    </li>
                ))}
            </ul>
        </>

    )
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