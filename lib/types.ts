export type ProgramListItem = {
  id: number;
  university_id: number;
  name: string;
  program_name: string;
  country: string;
  city: string;
  address: string;
  website: string;
  status: string;
};

export type UniversityListResponse = {
  result: boolean;
  data: ProgramListItem[];
  pagination: {
    current_page: number;
    per_page: number;
    total_docs: number;
    total_pages: number;
  };
  message: string;
};

export type LoginState = { error?: string };
export type RegisterState = { error?: string };


export type ProgramDetail = {
  id: number;
  name: string;
  degree: string;
  teaching_language: string;
  semester: string;
  application_start: string | null;
  application_end: string | null;
  application_platform: string;
  vpd_required: boolean;
  nc_status: string;
  program_url: string | null;
  description: string;
  university: {
    id: number;
    name: string;
    country: string;
    city: string;
    address: string;
    website: string;
  };
  admission_requirement: {
    required_german_gpa: string | null;
    gre: boolean;
    gmat: boolean;
    aps_required: boolean;
    notes: string;
  } | null;
  language_requirements: {
    language: string;
    exam: string;
    required_score: string;
  }[];
};

export type ProgramDetailResponse = {
  result: boolean;
  message: string;
  data: ProgramDetail;
};