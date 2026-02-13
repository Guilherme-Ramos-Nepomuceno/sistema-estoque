"use client"

import { Bell, Search } from "lucide-react"
import { useAppContext } from "@/lib/context"

export function TopBar() {
  const { viewMode, selectedBranch } = useAppContext()

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <span
            className={
              viewMode === "central"
                ? "px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary"
                : "px-2.5 py-1 rounded-md text-xs font-semibold bg-success/10 text-success"
            }
          >
            {viewMode === "central" ? "Hub Central" : "Unidade Operacional"}
          </span>
          {viewMode === "filial" && (
            <span className="text-xs text-muted-foreground">{selectedBranch.name}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-9 pr-3 py-1.5 w-56 rounded-lg border border-border bg-muted/30 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-colors"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-xs font-bold text-primary-foreground">AC</span>
        </div>
      </div>
    </header>
  )
}
