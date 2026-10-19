import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { apiGet } from "@/lib/api";
import {
  DEGREE_OPTIONS,
  LANGUAGE_OPTIONS,
  NC_OPTIONS,
  PLATFORM_OPTIONS,
  SEMESTER_OPTIONS,
  labelFor,
} from "@/lib/filters";
import { formatDate, getStatus, todayInBerlin, yesNo } from "@/lib/format";
import type { ProgramDetailResponse } from "@/lib/types";


function Section({ title, children}: { title: string; children: ReactNode}) {
    return (
        <section className="mt-8">
            <h2 className="mb-3 text-xl font-semibold">{title}</h2>
            {children}
        </section>
    );
}

function Fact({ label, value }: { label: string; value: string}) {
    return (
        <div>
            <dt className="text-sm text-gray-500">{label}</dt>
            <dd className="font-medium">{value}</dd>
        </div>
    )
}

async function ProgramDetails({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;

    if (!/^\d+$/.test(id)) notFound();

    const { data: program } = await apiGet<ProgramDetailResponse>(
        `/users/university/${id}/`
    );

    const uni = program.university;
    const req = program.admission_requirement;
    
    const status = getStatus(
        program.application_start,
        program.application_end,
        todayInBerlin()
    );
    
    return (
        <>
            <header className="mt-6">
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-bold">{program.name}</h1>
                    {status && <StatusBadge status={status} />}
                </div>

                <p className="mt-1 text-lg text-gray-600">{uni.name}</p>
                <p className="text-sm text-gray-500">{uni.address}</p>

                <div className="mt-4 flex gap-3">
                    {program.program_url && (
                        <a 
                            href={program.program_url}
                            target="_blank"
                            rel="noopener noreferre"
                            className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
                        >
                            Program website
                        </a>
                    )}
                    <a 
                        href={uni.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded border px-4 py-2 text-sm"
                        >
                            University website
                        </a>
                </div>
            </header>

            {program.description && (
                <Section title="About this program">
                    <p className="text-gray-600">{program.description}</p>
                </Section>
            )}

            <Section title="Overview">
                <dl className="grid gap-4 sm:grid-cols-2">
                    <Fact label="Degree" value={labelFor(DEGREE_OPTIONS, program.degree)}/>
                    <Fact label="Teaching lanuage" value={labelFor(LANGUAGE_OPTIONS, program.teaching_language)}/>
                    <Fact label="Degree" value={labelFor(SEMESTER_OPTIONS, program.semester)}/>
                    <Fact label="Degree" value={labelFor(NC_OPTIONS, program.nc_status)}/>
                </dl>
            </Section>

            <Section title="Application">
                <dl className="grid gap-4 sm:grid-cols-2">
                    <Fact label="Opens" value={formatDate(program.application_start)}/>
                    <Fact label="Deadline" value={formatDate(program.application_end)}/>
                    <Fact label="Platform" value={labelFor(PLATFORM_OPTIONS, program.application_platform)}/>
                    <Fact label="VPD required" value={yesNo(program.vpd_required)} />
                </dl>
            </Section>

            <Section title="Admission requirements">
                {req ? (
                    <>
                        <dl className="grid gap-4 sm:grid-cols-2">
                            <Fact label="Required German GPA" value={req.required_german_gpa ?? "Not specified"}/>
                            <Fact label="APS required" value={yesNo(req.aps_required)} />
                            <Fact label="GRE required" value={yesNo(req.gre)} />
                            <Fact label="GMAT required" value={yesNo(req.gmat)} />
                        </dl>
                        {req.notes && <p className="mt-4 text-sm text-gray-500">{req.notes}</p>}
                    </>
                ) : (
                    <p className="text-gray-500">No admission requirements listed yet.</p>
                )}
            </Section>

            <Section title="Language requirements">
                {program.language_requirements.length === 0 ? (
                <p className="text-gray-500">No language requirements listed.</p>
                ) : (
                <ul className="grid gap-2">
                    {program.language_requirements.map((r) => (
                    <li
                        key={`${r.language}-${r.exam}`}
                        className="flex justify-between rounded border p-3"
                    >
                        <span>
                            {labelFor(LANGUAGE_OPTIONS, r.language)} · {r.exam}
                        </span>
                        <span className="font-medium">{r.required_score}</span>
                    </li>
                    ))}
                </ul>
                )}
            </Section>

        </>
    );
}

export default function ProgramPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <main className="mx-auto max-w-3xl p-8">
            <Link href="/universities" className="text-sm text-blue-500 underline">
                ← Back to universities
            </Link>
            <Suspense fallback={<p className="mt-6">Loading program...</p>}>
                <ProgramDetails params={params} />
            </Suspense>
        </main>
    );
}