"use client"

import { Package, Inbox, Truck, Key, ArrowRight } from "lucide-react"
import { KpiCard } from "./kpi-card"
import { StatusBadge } from "./status-badge"
import { useAppContext } from "@/lib/context"
import { filialKPIs, filialRecentMovements, filialFleetStatus, filialKeyCustody } from "@/lib/mock-data"

export function DashboardFilial() {
  const { selectedBranch } = useAppContext()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Operacional</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {selectedBranch.name} - Execucao e controle local
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Itens em Estoque"
          value={filialKPIs.localStock}
          change={filialKPIs.localStockChange}
          icon={Package}
          variant="default"
        />
        <KpiCard
          title="Recebimentos Pendentes"
          value={filialKPIs.pendingReceipts}
          change={filialKPIs.pendingReceiptsChange}
          icon={Inbox}
          variant="warning"
        />
        <KpiCard
          title="Veiculos Ativos"
          value={filialKPIs.activeVehicles}
          icon={Truck}
          suffix={`${filialKPIs.activeMissions} em missao`}
          variant="default"
        />
        <KpiCard
          title="Chaves Retiradas"
          value={filialKPIs.keysOut}
          icon={Key}
          variant="danger"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Movements - Larger */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between p-5 pb-0">
            <div>
              <h3 className="text-sm font-semibold text-card-foreground">Movimentacoes Recentes</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Entradas e saidas de material</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
              Ver todas <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Item</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Tipo</th>
                  <th className="text-center text-xs font-medium text-muted-foreground px-5 py-3">Qtd</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Operador</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {filialRecentMovements.map((mov) => (
                  <tr key={mov.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-card-foreground">{mov.item}</p>
                      <p className="text-xs text-muted-foreground">{mov.id}</p>
                    </td>
                    <td className="px-5 py-3"><StatusBadge status={mov.type} /></td>
                    <td className="px-5 py-3 text-center font-mono font-medium text-card-foreground">{mov.qty}</td>
                    <td className="px-5 py-3 text-muted-foreground">{mov.operator}</td>
                    <td className="px-5 py-3 text-right text-xs text-muted-foreground">{mov.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Custody */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between p-5 pb-0">
            <div>
              <h3 className="text-sm font-semibold text-card-foreground">Custodia de Chaves</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Quem esta com o que</p>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {filialKeyCustody.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-card-foreground">{item.vehicle}</p>
                  <Key className="w-3.5 h-3.5 text-warning" />
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-card-foreground">{item.responsavel}</span>
                </p>
                <div className="flex items-center justify-between mt-1.5 text-[10px] text-muted-foreground">
                  <span>Retirada: {item.retirada.split(" ").slice(-1)}</span>
                  <span>Retorno: {item.previsaoRetorno.split(" ").slice(-1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fleet Status */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between p-5 pb-0">
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">Status da Frota</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Veiculos e missoes ativas</p>
          </div>
          <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
            Ver frota completa <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Veiculo</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Motorista</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Destino</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">KM Saida</th>
              </tr>
            </thead>
            <tbody>
              {filialFleetStatus.map((v, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3 font-medium text-card-foreground">{v.vehicle}</td>
                  <td className="px-5 py-3 text-muted-foreground">{v.driver}</td>
                  <td className="px-5 py-3"><StatusBadge status={v.status} /></td>
                  <td className="px-5 py-3 text-muted-foreground">{v.destination}</td>
                  <td className="px-5 py-3 text-right font-mono text-card-foreground">{v.kmSaida > 0 ? v.kmSaida.toLocaleString("pt-BR") : "---"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
