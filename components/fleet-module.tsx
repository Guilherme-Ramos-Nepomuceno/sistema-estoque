"use client"

import { useState } from "react"
import { Truck, Camera, Fuel, Gauge, Wrench, MapPin, Plus } from "lucide-react"
import { StatusBadge } from "./status-badge"
import { fleetVehicles, filialKeyCustody } from "@/lib/mock-data"
import { useAppContext } from "@/lib/context"
import { cn } from "@/lib/utils"

export function FleetModule() {
  const { viewMode } = useAppContext()
  const [showMissionModal, setShowMissionModal] = useState(false)
  const isCentral = viewMode === "central"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isCentral ? "Frota & Manutencao" : "Frota & Missoes"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isCentral
              ? "Gestao de veiculos, manutencao preventiva e custos"
              : "Controle de missoes, odometro e custodia de veiculos"}
          </p>
        </div>
        {!isCentral && (
          <button
            onClick={() => setShowMissionModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nova Missao
          </button>
        )}
      </div>

      {/* Fleet Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
              <Truck className="w-4 h-4 text-success" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Disponiveis</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">{fleetVehicles.filter(v => v.status === "disponivel").length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Em Missao</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">{fleetVehicles.filter(v => v.status === "em_missao").length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-destructive" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Manutencao</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">{fleetVehicles.filter(v => v.status === "manutencao").length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
              <Fuel className="w-4 h-4 text-warning" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Total Frota</span>
          </div>
          <p className="text-2xl font-bold text-card-foreground">{fleetVehicles.length}</p>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-card-foreground">Veiculos da Frota</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Veiculo</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Placa</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-5 py-3">KM Atual</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-5 py-3">Prox. Revisao</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-5 py-3">Combustivel</th>
                {!isCentral && (
                  <th className="text-center text-xs font-medium text-muted-foreground px-5 py-3">Acoes</th>
                )}
              </tr>
            </thead>
            <tbody>
              {fleetVehicles.map((vehicle) => {
                const maintenancePercent = (vehicle.km / parseInt(vehicle.nextMaintenance.replace(/\D/g, ""))) * 100
                const fuelColor = vehicle.fuelLevel > 60 ? "bg-success" : vehicle.fuelLevel > 30 ? "bg-warning" : "bg-destructive"

                return (
                  <tr key={vehicle.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-card-foreground">{vehicle.model}</p>
                      <p className="text-xs text-muted-foreground">Ano {vehicle.year}</p>
                    </td>
                    <td className="px-5 py-3 font-mono font-medium text-card-foreground">{vehicle.plate}</td>
                    <td className="px-5 py-3"><StatusBadge status={vehicle.status} /></td>
                    <td className="px-5 py-3 text-center font-mono text-card-foreground">
                      {vehicle.km.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-muted-foreground">{vehicle.nextMaintenance}</span>
                        <div className="w-full max-w-[80px] h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              maintenancePercent > 95 ? "bg-destructive" : maintenancePercent > 80 ? "bg-warning" : "bg-success"
                            )}
                            style={{ width: `${Math.min(maintenancePercent, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-muted-foreground">{vehicle.fuelLevel}%</span>
                        <div className="w-full max-w-[60px] h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className={cn("h-full rounded-full transition-all", fuelColor)}
                            style={{ width: `${vehicle.fuelLevel}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    {!isCentral && (
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Registrar odometro">
                            <Gauge className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                          <button className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Tirar foto">
                            <Camera className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mission Modal */}
      {showMissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border shadow-xl w-full max-w-md mx-4 p-6">
            <h2 className="text-lg font-semibold text-card-foreground mb-1">Nova Missao</h2>
            <p className="text-xs text-muted-foreground mb-5">Registre a saida do veiculo com evidencia fotografica</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-card-foreground mb-1 block">Veiculo</label>
                <select className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring/20">
                  <option>Selecione um veiculo</option>
                  {fleetVehicles.filter(v => v.status === "disponivel").map(v => (
                    <option key={v.id}>{v.model} - {v.plate}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-card-foreground mb-1 block">Destino</label>
                <input
                  type="text"
                  placeholder="Ex: Cliente Alphaville"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-card-foreground mb-1 block">KM de Saida</label>
                <input
                  type="number"
                  placeholder="Ex: 44800"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-card-foreground mb-1 block">Foto do Odometro (obrigatoria)</label>
                <div className="flex items-center justify-center w-full h-24 rounded-lg border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center gap-1">
                    <Camera className="w-5 h-5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Clique para capturar</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setShowMissionModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-card text-card-foreground hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowMissionModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors"
              >
                Iniciar Missao
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
