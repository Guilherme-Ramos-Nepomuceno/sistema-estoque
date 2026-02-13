"use client"

import { useState } from "react"
import { Search, Plus, ScanBarcode, Filter, Download, AlertTriangle, Eye, EyeOff, CheckSquare, Square } from "lucide-react"
import { StatusBadge } from "./status-badge"
import { catalogItems } from "@/lib/mock-data"
import { useAppContext } from "@/lib/context"
import { cn } from "@/lib/utils"

export function InventoryModule() {
  const { viewMode, selectedBranch, itemVisibility, toggleItemVisibility, isItemVisible, branches } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [scanMode, setScanMode] = useState(false)
  const [scannedFeedback, setScannedFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Visibility Management State
  const [managingVisibilityId, setManagingVisibilityId] = useState<string | null>(null)

  const isCentral = viewMode === "central"

  const categories = ["Todos", ...new Set(catalogItems.map((i) => i.category))]

  const filteredItems = catalogItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.includes(searchTerm)
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory

    // Visibility Check
    // If Central, see all. If Filial, only see what is allowed for the SELECTED branch (which implies the current user's branch context)
    const isVisible = isCentral ? true : isItemVisible(item.id, selectedBranch.id)

    return matchesSearch && matchesCategory && isVisible
  })

  const simulateScan = () => {
    setScanMode(true)
    setTimeout(() => {
      const randomItem = catalogItems[Math.floor(Math.random() * catalogItems.length)]
      setSearchTerm(randomItem.barcode)
      setScannedFeedback({
        type: "success",
        message: `Item identificado: ${randomItem.name}`,
      })
      setScanMode(false)
      setTimeout(() => setScannedFeedback(null), 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isCentral ? "Estoque & Catalogo" : "Recepcao & Consumo"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isCentral
              ? "Cadastro mestre de itens e controle de inventario"
              : `Inventario local: ${selectedBranch.name}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isCentral && (
            <button
              onClick={simulateScan}
              disabled={scanMode}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                scanMode
                  ? "bg-primary/20 text-primary animate-pulse"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
              )}
            >
              <ScanBarcode className="w-4 h-4" />
              {scanMode ? "Bipando..." : "Bipar Item"}
            </button>
          )}
          {isCentral && (
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors">
              <Plus className="w-4 h-4" />
              Novo Item
            </button>
          )}
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-border bg-card text-card-foreground hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scan Feedback */}
      {scannedFeedback && (
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all animate-in slide-in-from-top-2",
            scannedFeedback.type === "success"
              ? "bg-success/10 text-success border border-success/20"
              : "bg-destructive/10 text-destructive border border-destructive/20"
          )}
        >
          <ScanBarcode className="w-4 h-4" />
          {scannedFeedback.message}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, SKU ou codigo de barras..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">SKU</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Item</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Categoria</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-5 py-3">Unidade</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-5 py-3">Estoque</th>
                {isCentral && <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Preco</th>}
                <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Cod. Barras</th>
                {isCentral && (
                  <th className="text-center text-xs font-medium text-muted-foreground px-5 py-3">Visibilidade</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const isLowStock = item.currentStock <= item.minStock
                // Check how many branches can see this item
                const visibleCount = (itemVisibility[item.id] || []).length
                const totalBranches = branches.length
                const visibilityLabel = visibleCount === totalBranches ? "Todas" : visibleCount === 0 ? "Nenhuma" : `${visibleCount} Filiais`

                return (
                  <tr
                    key={item.id}
                    className={cn(
                      "border-b border-border last:border-0 hover:bg-muted/50 transition-colors",
                      isLowStock && "bg-destructive/5"
                    )}
                  >
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{item.id}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-card-foreground">{item.name}</p>
                        {isLowStock && <AlertTriangle className="w-3.5 h-3.5 text-destructive flex-shrink-0" />}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{item.category}</td>
                    <td className="px-5 py-3 text-center text-muted-foreground">{item.unit}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={cn("font-mono font-semibold", isLowStock ? "text-destructive" : "text-card-foreground")}>
                        {item.currentStock}
                      </span>
                    </td>
                    {isCentral && (
                      <td className="px-5 py-3 text-right font-medium text-card-foreground">{item.price}</td>
                    )}
                    <td className="px-5 py-3 text-right font-mono text-xs text-muted-foreground">{item.barcode}</td>

                    {isCentral && (
                      <td className="px-5 py-3 text-center">
                        <button
                          onClick={() => setManagingVisibilityId(item.id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-muted hover:bg-primary/10 hover:text-primary transition-colors border border-border"
                        >
                          <Eye className="w-3 h-3" />
                          {visibilityLabel}
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ScanBarcode className="w-10 h-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">Nenhum item visivel</p>
            <p className="text-xs text-muted-foreground mt-1">Este item pode estar restrito para sua filial.</p>
          </div>
        )}
      </div>

      {/* Visibility Modal */}
      {managingVisibilityId && isCentral && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-sm rounded-xl shadow-xl border border-border animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Visibilidade do Item</h3>
              <p className="text-xs text-muted-foreground mt-1">Selecione quais filiais podem ver este item no catalogo.</p>
            </div>
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {branches.map(branch => {
                const isVisible = isItemVisible(managingVisibilityId, branch.id)
                return (
                  <button
                    key={branch.id}
                    onClick={() => toggleItemVisibility(managingVisibilityId, branch.id)}
                    className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors group"
                  >
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{branch.name}</p>
                      <p className="text-xs text-muted-foreground">{branch.city}</p>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded flex items-center justify-center transition-colors",
                      isVisible ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {isVisible && <CheckSquare className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="p-4 border-t border-border flex justify-end">
              <button
                onClick={() => setManagingVisibilityId(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
