'use client'
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from "lucide-react"
import { cn } from '@/lib/utils'

const TransitionLinkButton = ({ href, children, className, variant, size, onClick, disabled, ...props }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleNavigate = (e) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return
    startTransition(() => {
      router.push(href)
    })
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("relative transition-all", className)}
      onClick={handleNavigate}
      disabled={isPending || disabled}
      {...props}
    >
      {isPending && <Loader2Icon className="animate-spin mr-2" size={18} />}
      {children}
    </Button>
  )
}

export default TransitionLinkButton
