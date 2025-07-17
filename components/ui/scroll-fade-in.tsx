"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollFadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  delay?: number // in ms
  duration?: number // in ms
  offset?: string // IntersectionObserver rootMargin
  direction?: "up" | "down" | "left" | "right" | "none" // New prop for animation direction
}

export function ScrollFadeIn({
  children,
  className,
  delay = 0,
  duration = 700,
  offset = "0px",
  direction = "up", // Default to 'up'
  ...props
}: ScrollFadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target) // Stop observing once visible
        }
      },
      {
        rootMargin: offset,
        threshold: 0.1, // Trigger when 10% of the element is visible
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [offset])

  const getTransformClass = () => {
    switch (direction) {
      case "up":
        return isVisible ? "translate-y-0" : "translate-y-8"
      case "down":
        return isVisible ? "translate-y-0" : "-translate-y-8"
      case "left":
        return isVisible ? "translate-x-0" : "translate-x-8"
      case "right":
        return isVisible ? "translate-x-0" : "-translate-x-8"
      case "none":
        return "" // No translation, just fade
      default:
        return isVisible ? "translate-y-0" : "translate-y-8"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        `duration-[${duration}ms]`, // Dynamic duration
        `delay-[${delay}ms]`, // Dynamic delay
        isVisible ? "opacity-100" : "opacity-0",
        getTransformClass(), // Apply transform based on direction
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
