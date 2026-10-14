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