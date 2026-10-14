"use server";

import { redirect } from "next/navigation";
import type { RegisterState } from "@/lib/types";

export async function register(
    prevState: RegisterState,
    formData: FormData,
): Promise<RegisterState> {
    const username = String(formData.get("username") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password != confirmPassword) {
        return { error: "Passwords do not match" };
    }

    const res = await fetch(`${process.env.API_URL}/users/register/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, email, password }),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.result) {
        return { error: json?.message ?? "Registration Failed" };
    }

    redirect("/login");
}
