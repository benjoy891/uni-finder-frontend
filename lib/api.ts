import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export async function apiGet<T>(path: string): Promise<T> {
  const token = (await cookies()).get("access_token")?.value;
  console.log("[apiGet]", path, "token present:", Boolean(token));
  if (!token) redirect("/login");

  const res = await fetch(`${process.env.API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("[apiGet]", path, "status:", res.status);

  if (res.status === 401) redirect("/login");
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`API request failed (${res.status})`);

  return res.json();
}