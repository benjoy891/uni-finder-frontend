"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { LoginState } from "@/lib/types";

export async function login(
    prevState: LoginState,
    formData: FormData,
): Promise<LoginState> {
    const username = String(formData.get("username") ?? "");
    const password  = String(formData.get("password") ?? "");
    const res = await fetch(`${process.env.API_URL}/users/login/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.result) {
        return { error: json?.message ?? "Login Failed" };
    }
    const store = await cookies();
    const options = {
        httpOnly: true,
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
        path: "/",
    };
    store.set("access_token", json.data.access, { ...options, maxAge: 60 * 30 });
    store.set("refresh_token", json.data.refresh, { ...options, maxAge: 60 * 60 * 24 });
    redirect("/universities");
}
