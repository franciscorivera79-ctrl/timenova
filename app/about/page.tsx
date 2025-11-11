import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 animate-gradient-shift" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-float"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 10 + "s",
              animationDuration: Math.random() * 20 + 10 + "s",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-200 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clock
        </Link>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12">
          <h1 className="font-sans text-4xl md:text-5xl font-light text-white mb-6">About Timenova</h1>

          <div className="space-y-4 text-purple-100 text-lg leading-relaxed">
            <p>Timenova helps you stay focused through time, light, and calm.</p>

            <p>
              In a world full of distractions, we created a space where time becomes your ally. Inspired by the infinite
              expanse of the cosmos, Timenova brings together elegant timekeeping, focused work sessions, and moments of
              inspiration.
            </p>

            <p>
              Whether you're using the clock to stay present, the focus mode to center yourself, the timer for
              productivity sprints, or quotes for motivation—Timenova is your companion in the journey toward clarity
              and purpose.
            </p>

            <p className="text-purple-200 italic mt-8">Time flows. Stay present. Stay focused.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
