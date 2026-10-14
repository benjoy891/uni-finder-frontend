"use client";

import { useActionState } from "react";
import { register } from "./actions";
import type { RegisterState } from "@/lib/types";
import Link from "next/link";

const initialState: RegisterState = {};

export default function RegisterPage() {
    const [state, formAction, pending] = useActionState(register, initialState);
    
    return (
        <main className="mx-auto max-w-sm p-8">
            <h1 className="mb-6 text-3xl font-bold">Register</h1>
            <form action={formAction} className="flex flex-col gap-4">
                <input 
                name="username" 
                placeholder="Username"
                required
                className="rounded border bg-transparent p-2"
                />
                <input
                name="email"
                type="email"
                placeholder="Email"
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
                <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                required
                className="rounded border bg-transparent p-2"
                />
                {state.error && <p className="text-red-500">{state.error}</p>}
                <button
                disabled={pending}
                className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                >
                    {pending ? "Creating account.." : "Register"}
                </button>
            </form>
            <p className="mt-4 text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 underline">
                Login
                </Link>
            </p>
        </main>
    );
}

