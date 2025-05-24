"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"

export default function FlashSaleCountdown() {
  // Set the initial countdown time (13 hours, 31 minutes, 59 seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 13,
    minutes: 31,
    seconds: 59,
  })

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        // Calculate the new time
        let { hours, minutes, seconds } = prevTime

        if (seconds > 0) {
          seconds -= 1
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes -= 1
          } else {
            minutes = 59
            if (hours > 0) {
              hours -= 1
            } else {
              // Timer has reached zero, you can handle this case
              // For example, reset the timer or show a message
              clearInterval(timer)
              return { hours: 0, minutes: 0, seconds: 0 }
            }
          }
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    // Clean up the interval on component unmount
    return () => clearInterval(timer)
  }, [])

  // Format numbers to always have two digits
  const formatNumber = (num) => {
    return num.toString().padStart(2, "0")
  }

  return (
    <div className="bg-red-600 text-white p-6 rounded-md max-w-xs">
      <h3 className="text-3xl font-bold mb-2 text-white">Flash Sale</h3>
      <p className="text-xl font-semibold mb-4">Up to 60% OFF</p>
      <p className="mb-3">This round ends in</p>

      {/* Countdown Timer */}
      <div className="flex justify-center gap-2 mb-6">
        <div className="bg-black rounded-md p-2 w-14 text-center">
          <span className="text-2xl font-bold">{formatNumber(timeLeft.hours)}</span>
        </div>
        <div className="text-2xl font-bold flex items-center">:</div>
        <div className="bg-black rounded-md p-2 w-14 text-center">
          <span className="text-2xl font-bold">{formatNumber(timeLeft.minutes)}</span>
        </div>
        <div className="text-2xl font-bold flex items-center">:</div>
        <div className="bg-black rounded-md p-2 w-14 text-center">
          <span className="text-2xl font-bold">{formatNumber(timeLeft.seconds)}</span>
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-center">
        <button className="bg-white text-red-600 font-medium py-2 px-8 rounded-full flex items-center">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  )
}

