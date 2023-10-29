"use client"

import Button from "@/components/admin/button";
import Input from "@/components/admin/input";
import SVG from "@/components/svg";
import Title from "@/components/admin/title";
import { useState } from "react";

export default function LoginPage() {
    const [deviceCode, setDeviceCode] = useState("")

    const login = () => {
        console.log("login");
    }

    return (
        <div>
            <main className="min-h-screen w-full container mx-auto py-48">
                <h1>Login</h1>

                <div className="mb-4 md:flex w-full">
                    <input
                        type="text"
                        className="border-2 border-gray-300 px-3 py-2 focus:outline-2 focus:outline-black rounded-lg hover:bg-gray-50 block md:flex-1 md:mb-0 w-full"
                        placeholder="Gerätecode"
                        onChange={(value) => {
                            setDeviceCode(value.currentTarget.value);
                        }}
                    />
                </div>
            </main>
        </div>
    )
}