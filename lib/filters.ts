export type SearchParams = Record<string, string | string[] | undefined>;
export type Option = { value: string; label: string };

export const FILTER_KEYS = [
  "search", "city", "degree", "teaching_language", "semester", "status",
  "application_platform", "nc_status", "required_gpa",
  "aps_required", "gre_required", "gmat_required", "vpd_required",
  "ordering",
] as const;


export function buildApiQuery(params: SearchParams): string {
    const query = new URLSearchParams();
    for (const key of FILTER_KEYS) {
        const value = params[key];
        if (typeof value == "string" && value.trim() !== "") {
            query.set(key, value.trim());
        }
    }
    return query.toString();
}

export const DEGREE_OPTIONS: Option[] = [
    { value: "BACHELOR", label: "Bachelor"},
    { value: "MASTER", label: "Master" },
    { value: "PHD", label: "PhD" },
]
export const LANGUAGE_OPTIONS: Option[] = [
  { value: "ENGLISH", label: "English" },
  { value: "GERMAN", label: "German" },
];
export const SEMESTER_OPTIONS: Option[] = [
  { value: "WINTER", label: "Winter" },
  { value: "SUMMER", label: "Summer" },
];
export const STATUS_OPTIONS: Option[] = [
  { value: "OPEN", label: "Open" },
  { value: "OPENING_SOON", label: "Opening soon" },
  { value: "CLOSED", label: "Closed" },
];
export const PLATFORM_OPTIONS: Option[] = [
  { value: "DIRECT", label: "Direct" },
  { value: "UNI_ASSIST", label: "Uni-Assist" },
  { value: "VPD", label: "VPD through Uni-assist" },
];
export const NC_OPTIONS: Option[] = [
  { value: "NC_FREE", label: "NC-free" },
  { value: "NC", label: "NC" },
];
export const YES_NO_OPTIONS: Option[] = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

export const ORDERING_OPTIONS: Option[] = [
  { value: "deadline", label: "Deadline (earliest first)" },
  { value: "-deadline", label: "Deadline (latest first)" },
  { value: "name", label: "University (A–Z)" },
  { value: "-name", label: "University (Z–A)" },
  { value: "gpa", label: "Required GPA (low to high)" },
  { value: "-gpa", label: "Required GPA (high to low)" },
];

export function labelFor(options: Option[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}