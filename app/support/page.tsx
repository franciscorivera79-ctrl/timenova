"use client"
import { useEffect } from "react"

export default function SupportPage() {
    useEffect(() => {
        window.location.href = "https://tinyurl.com/timenova"
    }, [])

    return (
        <main className="min-h-screen flex items-center justify-center bg-black text-white">
            <p>Redirecting you to Buy Me a Coffee… ☕</p>
        </main>
    )
}