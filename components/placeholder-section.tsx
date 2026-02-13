"use client"

import { Construction } from "lucide-react"

interface PlaceholderSectionProps {
  title: string
  description: string
}

export function PlaceholderSection({ title, description }: PlaceholderSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="flex flex-col items-center justify-center py-20 rounded-xl border border-dashed border-border bg-card">
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Construction className="w-7 h-7 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-semibold text-card-foreground mb-1">Modulo em desenvolvimento</h3>
        <p className="text-xs text-muted-foreground max-w-sm text-center">
          Este modulo esta sendo construido e estara disponivel em breve.
        </p>
      </div>
    </div>
  )
}
