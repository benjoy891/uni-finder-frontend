"use client";

import type { ComponentProps, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type Option,
  DEGREE_OPTIONS,
  LANGUAGE_OPTIONS,
  SEMESTER_OPTIONS,
  STATUS_OPTIONS,
  PLATFORM_OPTIONS,
  NC_OPTIONS,
  YES_NO_OPTIONS,
  ORDERING_OPTIONS,
} from "@/lib/filters";


const inputClass = "rounded border bg-transparant p-2";
const selectClass = "rounded border bg-transparant p-2 [&>option]:text-black";

function TextField({ label, ...props }: { label: string } & ComponentProps<"input">) {
    return (
        <label className="flex flex-col gap-1 text-sm">
            {label}
            <input {...props} className={inputClass} />
        </label>
    );
}

function SelectField({
    label,
    options,
    ...props
}: {label: string; options: Option[] } & ComponentProps<"select">){
    return (
        <label className="flex flex-col gap-1 text-sm">
            {label}
            <select {...props} className={selectClass}>
                <option value="">Any</option>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

const ADVANCED_KEYS = [
  "application_platform", "nc_status", "required_gpa",
  "aps_required", "gre_required", "gmat_required", "vpd_required",
];

export default function FilterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const get = (name: string) => searchParams.get(name) ?? "";
    const advancedActive = ADVANCED_KEYS.some((key) => get(key) !== "");


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const params = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
            if (typeof value === "string" && value.trim() !== ""){
                params.set(key, value.trim());
            }
        }
        const qs = params.toString();
        router.push(qs ? `/universities?${qs}` : "/universities");
    }

    function handleReset() {
        router.push("/universities");
    }

    return (
        <form
        key={searchParams.toString()}
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col gap-4 rounded-lg border p-4"
        >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <TextField label="Search" name="search" placeholder="Program or university" defaultValue={get("search")} />
                <TextField label="City" name="city" placeholder="e.g. Trier" defaultValue={get("city")} />
                <SelectField label="Degree" name="degree" options={DEGREE_OPTIONS} defaultValue={get("degree")} />
                <SelectField label="Teaching language" name="teaching_language" options={LANGUAGE_OPTIONS} defaultValue={get("teaching_language")} />
                <SelectField label="Semester" name="semester" options={SEMESTER_OPTIONS} defaultValue={get("semester")} />
                <SelectField label="Application status" name="status" options={STATUS_OPTIONS} defaultValue={get("status")} />
                <SelectField label="Sort by" name="ordering" options={ORDERING_OPTIONS} defaultValue={get("ordering")} />
            </div> 
            <details open={advancedActive}>
                <summary className="cursor-pointer text-sm">More filters</summary>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <SelectField label="Application platform" name="application_platform" options={PLATFORM_OPTIONS} defaultValue={get("application_platform")} />
                    <SelectField label="NC status" name="nc_status" options={NC_OPTIONS} defaultValue={get("nc_status")} />
                    <TextField label="My German GPA (1.0 = best)" name="required_gpa" type="number" step="0.1" min="1" max="4" defaultValue={get("required_gpa")} />
                    <SelectField label="APS required" name="aps_required" options={YES_NO_OPTIONS} defaultValue={get("aps_required")} />
                    <SelectField label="GRE required" name="gre_required" options={YES_NO_OPTIONS} defaultValue={get("gre_required")} />
                    <SelectField label="GMAT required" name="gmat_required" options={YES_NO_OPTIONS} defaultValue={get("gmat_required")} />
                    <SelectField label="VPD required" name="vpd_required" options={YES_NO_OPTIONS} defaultValue={get("vpd_required")} />
                </div>
            </details>
            <div className="flex gap-2">
                <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
                Apply filters
                </button>
                <button type="button" onClick={handleReset} className="rounded border px-4 py-2">
                Reset
                </button>
            </div>
        </form>
    )
}