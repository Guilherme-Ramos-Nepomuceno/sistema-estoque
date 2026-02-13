"use client"

import { Package, ShoppingCart, AlertTriangle, DollarSign, ArrowRight } from "lucide-react"
import { KpiCard } from "./kpi-card"
import { StatusBadge } from "./status-badge"
import { centralKPIs, recentOrders, fleetMaintenanceAlerts, branchConsumption, monthlyConsumption } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

export function DashboardCentral() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Central</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visao geral de governanca e controle de suprimentos
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total de Itens"
          value={centralKPIs.totalItems}
          change={centralKPIs.totalItemsChange}
          icon={Package}
          variant="default"
        />
        <KpiCard
          title="Pedidos Pendentes"
          value={centralKPIs.pendingOrders}
          change={centralKPIs.pendingOrdersChange}
          icon={ShoppingCart}
          variant="warning"
        />
        <KpiCard
          title="Alertas Frota"
          value={centralKPIs.fleetAlerts}
          change={centralKPIs.fleetAlertsChange}
          icon={AlertTriangle}
          variant="danger"
        />
        <KpiCard
          title="Gasto Mensal"
          value={`R$ ${(centralKPIs.monthlySpend / 1000).toFixed(1)}k`}
          change={centralKPIs.monthlySpendChange}
          icon={DollarSign}
          variant="success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch Consumption */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-card-foreground">Consumo por Filial</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Consumo atual vs. meta mensal</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchConsumption} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 10% 88%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(40 10% 88%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="consumo" fill="hsl(217 91% 60%)" radius={[4, 4, 0, 0]} name="Consumo" />
                <Bar dataKey="meta" fill="hsl(40 10% 88%)" radius={[4, 4, 0, 0]} name="Meta" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-card-foreground">Evolucao Mensal de Custos</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Central vs. Filiais - Ultimos 7 meses</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyConsumption}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40 10% 88%)" />
                <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 100%)",
                    border: "1px solid hsl(40 10% 88%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="central" stroke="hsl(217 91% 60%)" fill="hsl(217 91% 60% / 0.1)" strokeWidth={2} name="Central" />
                <Area type="monotone" dataKey="filiais" stroke="hsl(160 84% 39%)" fill="hsl(160 84% 39% / 0.1)" strokeWidth={2} name="Filiais" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between p-5 pb-0">
            <div>
              <h3 className="text-sm font-semibold text-card-foreground">Pedidos Recentes</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Ultimas solicitacoes das filiais</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
              Ver todos <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Pedido</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Filial</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-card-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{order.filial}</td>
                    <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                    <td className="px-5 py-3 text-right font-medium text-card-foreground">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fleet Alerts */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between p-5 pb-0">
            <div>
              <h3 className="text-sm font-semibold text-card-foreground">Alertas de Manutencao</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Status da frota - cores semaforicas</p>
            </div>
            <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
              Ver todos <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Veiculo</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Servico</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Prazo</th>
                </tr>
              </thead>
              <tbody>
                {fleetMaintenanceAlerts.map((alert, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-card-foreground">{alert.vehicle}</p>
                      <p className="text-xs text-muted-foreground">{alert.km}</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{alert.type}</td>
                    <td className="px-5 py-3"><StatusBadge status={alert.status} /></td>
                    <td className="px-5 py-3 text-right text-muted-foreground">{alert.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
