"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  suffix?: string
  variant?: "default" | "success" | "warning" | "danger"
}

export function KpiCard({ title, value, change, icon: Icon, suffix, variant = "default" }: KpiCardProps) {
  const variantStyles = {
    default: "bg-card",
    success: "bg-card",
    warning: "bg-card",
    danger: "bg-card",
  }

  const iconBgStyles = {
    default: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-destructive/10 text-destructive",
  }

  return (
    <div className={cn("rounded-xl border border-border p-5 shadow-sm transition-shadow hover:shadow-md", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-card-foreground tabular-nums">
            {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
            {suffix && <span className="text-sm font-normal text-muted-foreground ml-1">{suffix}</span>}
          </p>
        </div>
        <div className={cn("flex items-center justify-center w-10 h-10 rounded-lg", iconBgStyles[variant])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-1 mt-3">
          {change >= 0 ? (
            <TrendingUp className="w-3.5 h-3.5 text-success" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-destructive" />
          )}
          <span className={cn("text-xs font-medium", change >= 0 ? "text-success" : "text-destructive")}>
            {change > 0 ? "+" : ""}{change}%
          </span>
          <span className="text-xs text-muted-foreground">vs. mes anterior</span>
        </div>
      )}
    </div>
  )
}
