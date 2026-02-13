"use client"

import {
  LayoutDashboard,
  Package,
  Truck,
  ClipboardList,
  Building2,
  Users,
  ShieldCheck,
  BarChart3,
  Key,
  ScanBarcode,
  ArrowLeftRight,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react"
import { useAppContext, type ViewMode } from "@/lib/context"
import { cn } from "@/lib/utils"
import { useState } from "react"

const centralMenu = [
  { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { label: "Estoque & Catalogo", icon: Package, id: "inventory" },
  { label: "Frota & Manutencao", icon: Truck, id: "fleet" },
  { label: "Solicitacoes", icon: ClipboardList, id: "requests" },
  { label: "Filiais & RBAC", icon: Building2, id: "branches" },
  { label: "Relatorios", icon: BarChart3, id: "reports" },
]

const filialMenu = [
  { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { label: "Recepcao & Consumo", icon: ScanBarcode, id: "inventory" },
  { label: "Frota & Missoes", icon: Truck, id: "fleet" },
  { label: "Custodia de Chaves", icon: Key, id: "keys" },
  { label: "Solicitacoes", icon: ClipboardList, id: "requests" },
  { label: "Movimentacoes", icon: ArrowLeftRight, id: "movements" },
]

interface AppSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  const { viewMode, setViewMode, selectedBranch, setSelectedBranch, branches, sidebarOpen, toggleSidebar } = useAppContext()
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false)

  const menu = viewMode === "central" ? centralMenu : filialMenu

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out h-screen sticky top-0",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-sidebar-border">
        {sidebarOpen && (
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-primary">
              <Package className="w-4 h-4 text-sidebar-primary-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-sidebar-primary-foreground truncate">Sistema de Estoque</p>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-sidebar-accent transition-colors text-sidebar-muted"
        >
          {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Context Switcher */}
      {sidebarOpen && (
        <div className="px-3 py-3">
          <div className="flex rounded-lg bg-sidebar-accent p-1">
            <button
              onClick={() => {
                setViewMode("central")
                onSectionChange("dashboard")
              }}
              className={cn(
                "flex-1 text-xs font-medium py-1.5 rounded-md transition-all duration-200",
                viewMode === "central"
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-muted hover:text-sidebar-foreground"
              )}
            >
              Central
            </button>
            <button
              onClick={() => {
                setViewMode("filial")
                onSectionChange("dashboard")
              }}
              className={cn(
                "flex-1 text-xs font-medium py-1.5 rounded-md transition-all duration-200",
                viewMode === "filial"
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-muted hover:text-sidebar-foreground"
              )}
            >
              Filial
            </button>
          </div>

          {/* Branch Selector (only for Filial mode) */}
          {viewMode === "filial" && (
            <div className="relative mt-2">
              <button
                onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-md bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-border transition-colors"
              >
                <span className="truncate">{selectedBranch.name}</span>
                <ChevronDown className={cn("w-3 h-3 ml-1 transition-transform flex-shrink-0", branchDropdownOpen && "rotate-180")} />
              </button>
              {branchDropdownOpen && (
                <div className="absolute z-50 mt-1 w-full rounded-lg bg-sidebar-accent border border-sidebar-border shadow-lg overflow-hidden">
                  {branches.map((branch) => (
                    <button
                      key={branch.id}
                      onClick={() => {
                        setSelectedBranch(branch)
                        setBranchDropdownOpen(false)
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 text-xs hover:bg-sidebar-border transition-colors",
                        selectedBranch.id === branch.id
                          ? "text-sidebar-primary font-medium"
                          : "text-sidebar-foreground"
                      )}
                    >
                      {branch.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {!sidebarOpen && (
          <div className="flex flex-col items-center gap-1 mb-3 pb-3 border-b border-sidebar-border">
            <button
              onClick={() => {
                setViewMode("central")
                onSectionChange("dashboard")
              }}
              className={cn(
                "w-10 h-6 rounded text-[10px] font-medium transition-all",
                viewMode === "central"
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-muted hover:text-sidebar-foreground"
              )}
            >
              C
            </button>
            <button
              onClick={() => {
                setViewMode("filial")
                onSectionChange("dashboard")
              }}
              className={cn(
                "w-10 h-6 rounded text-[10px] font-medium transition-all",
                viewMode === "filial"
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-muted hover:text-sidebar-foreground"
              )}
            >
              F
            </button>
          </div>
        )}
        {menu.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium"
                  : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                !sidebarOpen && "justify-center px-0"
              )}
              title={!sidebarOpen ? item.label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      {sidebarOpen && (
        <div className="px-3 py-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <Users className="w-4 h-4 text-sidebar-muted" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">Admin Central</p>
              <p className="text-[10px] text-sidebar-muted truncate">admin@nexus.com.br</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
