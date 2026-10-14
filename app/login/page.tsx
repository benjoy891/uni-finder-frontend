"use client";

import { useActionState } from "react";
import { login } from "./actions";
import type { LoginState } from "@/lib/types";
import Link from "next/link";

const initialState: LoginState = {};

export default function LoginPage() {
    const [state, formAction, pending] = useActionState(login, initialState);
    
    return (
        <main className="mx-auto max-w-sm p-8">
            <h1 className="mb-6 text-3xl font-bold">Login</h1>
            <form action={formAction} className="flex flex-col gap-4">
                <input 
                name="username" 
                placeholder="Username"
                required
                className="rounded border bg-transparent p-2"
                />
                <input 
                type="password" 
                name="password"
                placeholder="Password" 
                required
                className="rounded border bg-transparent p-2" 
                />
                {state.error && <p className="text-red-500">{state.error}</p>}
                <button
                disabled={pending}
                className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                >
                    {pending ? "Logging in..." : "Login"}
                </button>
            </form>
            <p className="mt-4 text-sm text-gray-500">
            No account yet?{" "}
            <Link href="/register" className="text-blue-500 underline">
                Register
            </Link>
            </p>
        </main>
    );
}

