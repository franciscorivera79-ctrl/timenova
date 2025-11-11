"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Timer, Quote, Volume2, VolumeX, Coffee } from "lucide-react"
import Link from "next/link"

type Mode = "clock" | "focus" | "timer" | "quotes"

const motivationalQuotes = [
  "Stay focused on your goals, one moment at a time.",
  "The universe is vast, but your focus makes it intimate.",
  "Time is the canvas, focus is the brush.",
  "Every second is a chance to begin again.",
  "In the stillness of space, find your clarity.",
  "Your potential is infinite, like the cosmos.",
  "Focus is the gateway between dreams and reality.",
  "Time flows, but your presence anchors you.",
]

export default function Home() {
  const [currentTime, setCurrentTime] = useState("")
  const [mode, setMode] = useState<Mode>("clock")
  const [timerMinutes, setTimerMinutes] = useState(25)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
// Add this below your useState declarations
  const [stars, setStars] = useState<{ left: string; top: string; size: string; delay: string; duration: string }[]>([]);

useEffect(() => {
  // Generate stars only once after component mounts
  const generatedStars = Array.from({ length: 80 }, () => ({
    left: Math.random() * 100 + "%",
    top: Math.random() * 100 + "%",
    size: Math.random() * 3 + 1 + "px",
    delay: Math.random() * 30 + "s",
    duration: Math.random() * 60 + 30 + "s",
  }));
  setStars(generatedStars);
}, []);
  // Update clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  // Timer logic
  useEffect(() => {
    if (mode === "timer" && isTimerRunning) {
      if (timerMinutes === 0 && timerSeconds === 0) {
        setIsTimerRunning(false)
        if (soundEnabled) {
          // Play alert sound
          const audio = new Audio(
            "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGJ0vPTgjMGHm7A7+OZURE=",
          )
          audio.play()
        }
        return
      }

      const interval = setInterval(() => {
        if (timerSeconds === 0) {
          setTimerMinutes((prev) => prev - 1)
          setTimerSeconds(59)
        } else {
          setTimerSeconds((prev) => prev - 1)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [mode, isTimerRunning, timerMinutes, timerSeconds, soundEnabled])

  // Rotate quotes
  useEffect(() => {
    if (mode === "quotes") {
      const interval = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length)
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [mode])
// 🔊 Ambient sound control
useEffect(() => {
  const audio = new Audio("/sounds/space-ambience.mp3");
  audio.loop = true;
  audio.volume = 0.4; // volumen bajo
  if (soundEnabled) {
    audio.play().catch(() => {
      console.warn("Autoplay blocked until user interaction");
    });
  } else {
    audio.pause();
  }

  // Limpieza: detener sonido al desmontar
  return () => audio.pause();
}, [soundEnabled]);
  const resetTimer = () => {
    setTimerMinutes(25)
    setTimerSeconds(0)
    setIsTimerRunning(false)
  }

  const timerPercentage = ((25 * 60 - (timerMinutes * 60 + timerSeconds)) / (25 * 60)) * 100

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-900 to-purple-900 animate-color-fade" />
      <div className="absolute inset-0 bg-gradient-to-tl from-magenta-900 via-purple-950 to-black opacity-80 animate-color-fade-alternate" />

      <div className="absolute inset-0 animate-nebula-drift opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-magenta-600/20 to-transparent blur-[100px] animate-nebula-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/30 via-transparent to-purple-600/40 blur-[120px] animate-nebula-drift-slow" />
        <div className="absolute inset-0 bg-gradient-to-br from-magenta-500/30 via-transparent to-blue-500/20 blur-[100px] animate-nebula-drift-reverse" />
      </div>

      {/* Stars (rendered once after mount) */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {stars.map((star, i) => (
    <div
      key={i}
      className="absolute bg-white rounded-full opacity-60 animate-star-drift-mid"
      style={{
        width: star.size,
        height: star.size,
        left: star.left,
        top: star.top,
        animationDelay: star.delay,
        animationDuration: star.duration,
      }}
    />
  ))}
</div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 w-full">
        {/* Clock Display */}
        <div className="text-center transition-all duration-500">
          {mode === "timer" ? (
            <div className="flex flex-col items-center gap-6">
              {/* Circular timer */}
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="45%" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
                    strokeDashoffset={2 * Math.PI * 45 * (1 - timerPercentage / 100)}
                    className="transition-all duration-1000"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-sans text-5xl md:text-7xl font-light text-white tracking-wider">
                    {String(timerMinutes).padStart(2, "0")}:{String(timerSeconds).padStart(2, "0")}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                >
                  {isTimerRunning ? "Pause" : "Start"}
                </Button>
                <Button
                  onClick={resetTimer}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
                >
                  Reset
                </Button>
              </div>
            </div>
          ) : (
            <h1 className="font-sans text-7xl md:text-9xl font-light text-white tracking-wider animate-fade-in">
              {currentTime}
            </h1>
          )}

          {mode === "focus" && <p className="mt-8 text-xl md:text-2xl text-purple-200 animate-pulse">Stay focused</p>}

          {mode === "quotes" && (
            <div className="mt-12 max-w-2xl mx-auto px-4">
              <p className="text-2xl md:text-3xl text-white font-light leading-relaxed animate-fade-in text-balance">
                &ldquo;{motivationalQuotes[currentQuote]}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Mode buttons */}
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <Button
            onClick={() => setMode("clock")}
            className={`bg-white/10 hover:bg-white/20 text-white border backdrop-blur-sm transition-all ${
              mode === "clock" ? "border-purple-400 bg-white/20" : "border-white/20"
            }`}
            size="sm"
          >
            <Clock className="w-4 h-4 mr-2" />
            Clock
          </Button>
          <Button
            onClick={() => setMode("focus")}
            className={`bg-white/10 hover:bg-white/20 text-white border backdrop-blur-sm transition-all ${
              mode === "focus" ? "border-purple-400 bg-white/20" : "border-white/20"
            }`}
            size="sm"
          >
            <Timer className="w-4 h-4 mr-2" />
            Focus
          </Button>
          <Button
            onClick={() => {
              setMode("timer")
              resetTimer()
            }}
            className={`bg-white/10 hover:bg-white/20 text-white border backdrop-blur-sm transition-all ${
              mode === "timer" ? "border-purple-400 bg-white/20" : "border-white/20"
            }`}
            size="sm"
          >
            <Timer className="w-4 h-4 mr-2" />
            Timer
          </Button>
          <Button
            onClick={() => setMode("quotes")}
            className={`bg-white/10 hover:bg-white/20 text-white border backdrop-blur-sm transition-all ${
              mode === "quotes" ? "border-purple-400 bg-white/20" : "border-white/20"
            }`}
            size="sm"
          >
            <Quote className="w-4 h-4 mr-2" />
            Quotes
          </Button>
          <Button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
            size="sm"
            title={soundEnabled ? "Sound On" : "Sound Off"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation links */}
        <div className="flex gap-4 text-sm">
          <Link href="/about" className="text-purple-200 hover:text-white transition-colors">
            About
          </Link>
          <span className="text-purple-300">•</span>
          <Link href="/contact" className="text-purple-200 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10">
        <a
          href="https://buymeacoffee.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-purple-200 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
        >
          <Coffee className="w-4 h-4" />
          Buy me a coffee
        </a>
      </div>
    </div>
  )
}
