"use client"

import { useState } from "react"
import { Plus, Search, Filter, ClipboardList, ShoppingCart, Package, AlertCircle } from "lucide-react"
import { StatusBadge } from "./status-badge"
import { supplyRequests, catalogItems } from "@/lib/mock-data"
import { useAppContext } from "@/lib/context"
import { cn } from "@/lib/utils"

export function RequestsModule() {
  const { viewMode } = useAppContext()
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [requestMode, setRequestMode] = useState<"catalog" | "custom">("catalog")
  const [cart, setCart] = useState<{ id: string; name: string; qty: number }[]>([])
  const [filterStatus, setFilterStatus] = useState("todos")

  // Custom item form state
  const [customItemName, setCustomItemName] = useState("")
  const [customItemQty, setCustomItemQty] = useState(1)
  const [customItemReason, setCustomItemReason] = useState("")
  const [customRequestSubmitted, setCustomRequestSubmitted] = useState(false)

  const isCentral = viewMode === "central"

  const statuses = ["todos", "pendente", "aprovada", "em_separacao", "enviada", "recebida"]

  const filteredRequests = supplyRequests.filter(
    (r) => filterStatus === "todos" || r.status === filterStatus
  )

  const addToCart = (item: typeof catalogItems[0]) => {
    const existing = cart.find((c) => c.id === item.id)
    if (existing) {
      setCart(cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c)))
    } else {
      setCart([...cart, { id: item.id, name: item.name, qty: 1 }])
    }
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((c) => c.id !== id))
  }

  const submitCustomRequest = (e: React.FormEvent) => {
    e.preventDefault()
    setCustomRequestSubmitted(true)
    setTimeout(() => {
      setShowNewRequest(false)
      setCustomRequestSubmitted(false)
      setCustomItemName("")
      setCustomItemQty(1)
      setCustomItemReason("")
      // In a real app, we would add this to the requests list via context/API
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Solicitacoes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isCentral
              ? "Gerencie e aprove as solicitacoes das filiais"
              : "Crie pedidos de reposicao para a central"}
          </p>
        </div>
        {!isCentral && (
          <button
            onClick={() => setShowNewRequest(!showNewRequest)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nova Solicitacao
          </button>
        )}
      </div>

      {/* New Request Flow (Filial only) */}
      {showNewRequest && !isCentral && (
        <div className="space-y-4 animate-in slide-in-from-top-2">

          {/* Toggle Mode */}
          <div className="flex justify-center">
            <div className="bg-muted p-1 rounded-lg inline-flex">
              <button
                onClick={() => setRequestMode("catalog")}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                  requestMode === "catalog" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Catalogo Oficial
              </button>
              <button
                onClick={() => setRequestMode("custom")}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                  requestMode === "custom" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Item Nao Cadastrado
              </button>
            </div>
          </div>

          {requestMode === "catalog" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Item Selector */}
              <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm p-5">
                <h3 className="text-sm font-semibold text-card-foreground mb-3">Selecione os itens</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {catalogItems.slice(0, 6).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => addToCart(item)}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-card-foreground truncate">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground">{item.category} - {item.unit}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cart */}
              <div className="rounded-xl border border-border bg-card shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingCart className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-card-foreground">Carrinho ({cart.length})</h3>
                </div>
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ShoppingCart className="w-8 h-8 text-muted-foreground/40 mb-2" />
                    <p className="text-xs text-muted-foreground">Carrinho vazio</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-card-foreground truncate">{item.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-semibold text-card-foreground">x{item.qty}</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-destructive hover:text-destructive/80 transition-colors"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className="w-full mt-3 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors">
                      Enviar Solicitacao
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto rounded-xl border border-border bg-card shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Solicitar Item Especial</h3>
                  <p className="text-sm text-muted-foreground">Use este formulario para itens que nao constam no catalogo oficial.</p>
                </div>
              </div>

              {customRequestSubmitted ? (
                <div className="text-center py-10 animate-in fade-in zoom-in">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ClipboardList className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Solicitacao Enviada!</h3>
                  <p className="text-muted-foreground">O setor de compras analisara seu pedido em breve.</p>
                </div>
              ) : (
                <form onSubmit={submitCustomRequest} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Nome/Descricao do Item</label>
                    <input
                      required
                      value={customItemName}
                      onChange={e => setCustomItemName(e.target.value)}
                      placeholder="Ex: Parafusadeira Makita 12V"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Quantidade</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={customItemQty}
                        onChange={e => setCustomItemQty(parseInt(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Urgencia</label>
                      <select className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20">
                        <option value="normal">Normal</option>
                        <option value="urgente">Urgente</option>
                        <option value="critica">Critica (Parada de Operacao)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">Justificativa / Observacoes</label>
                    <textarea
                      rows={3}
                      value={customItemReason}
                      onChange={e => setCustomItemReason(e.target.value)}
                      placeholder="Explique por que este item e necessario e nao pode ser substituido por um do catalogo..."
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowNewRequest(false)}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors"
                    >
                      Enviar Aprovacao
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors capitalize",
              filterStatus === s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {s === "todos" ? "Todos" : s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Solicitacao</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Filial</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-5 py-3">Itens</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Solicitante</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Urgencia</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                {isCentral && (
                  <th className="text-center text-xs font-medium text-muted-foreground px-5 py-3">Acoes</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium text-card-foreground">{req.id}</p>
                    <p className="text-xs text-muted-foreground">{req.date}</p>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{req.filial}</td>
                  <td className="px-5 py-3 text-center font-mono font-semibold text-card-foreground">{req.items}</td>
                  <td className="px-5 py-3 text-muted-foreground">{req.requester}</td>
                  <td className="px-5 py-3"><StatusBadge status={req.urgency} /></td>
                  <td className="px-5 py-3"><StatusBadge status={req.status} /></td>
                  {isCentral && (
                    <td className="px-5 py-3 text-center">
                      {req.status === "pendente" ? (
                        <div className="flex items-center justify-center gap-1">
                          <button className="px-2.5 py-1 rounded-md text-xs font-medium bg-success/10 text-success hover:bg-success/20 transition-colors">
                            Aprovar
                          </button>
                          <button className="px-2.5 py-1 rounded-md text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                            Rejeitar
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">---</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
