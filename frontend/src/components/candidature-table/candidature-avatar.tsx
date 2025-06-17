"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface CandidatureAvatarProps {
  src?: string
  alt?: string
  fallback: string
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-10 w-10 text-base",
}

export function CandidatureAvatar({ src, alt, fallback, className, size = "md" }: CandidatureAvatarProps) {
  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={src || "/placeholder.svg"} alt={alt} />
      <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white font-medium">
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}
