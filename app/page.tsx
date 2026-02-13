"use client"

import { useState } from "react"
import { AppProvider, useAppContext } from "@/lib/context"
import { AppSidebar } from "@/components/app-sidebar"
import { TopBar } from "@/components/top-bar"
import { DashboardCentral } from "@/components/dashboard-central"
import { DashboardFilial } from "@/components/dashboard-filial"
import { InventoryModule } from "@/components/inventory-module"
import { FleetModule } from "@/components/fleet-module"
import { RequestsModule } from "@/components/requests-module"
import { PlaceholderSection } from "@/components/placeholder-section"
import { LoginPage } from "@/components/login-page"
import { BranchesModule } from "@/components/branches-module"

function AppContent() {
  const { viewMode, user } = useAppContext()
  const [activeSection, setActiveSection] = useState("dashboard")

  if (!user) {
    return <LoginPage />
  }

  const renderContent = () => {
    if (activeSection === "dashboard") {
      return viewMode === "central" ? <DashboardCentral /> : <DashboardFilial />
    }
    if (activeSection === "inventory") {
      return <InventoryModule />
    }
    if (activeSection === "fleet") {
      return <FleetModule />
    }
    if (activeSection === "requests") {
      return <RequestsModule />
    }
    if (activeSection === "keys") {
      return (
        <PlaceholderSection
          title="Custodia de Chaves"
          description="Controle de retirada e devolucao de chaves de veiculos em tempo real"
        />
      )
    }
    if (activeSection === "movements") {
      return (
        <PlaceholderSection
          title="Movimentacoes"
          description="Historico completo de entradas e saidas de materiais"
        />
      )
    }
    if (activeSection === "branches") {
      return <BranchesModule />
    }
    if (activeSection === "reports") {
      return (
        <PlaceholderSection
          title="Relatorios"
          description="Relatorios analiticos e exportacao de dados"
        />
      )
    }
    return viewMode === "central" ? <DashboardCentral /> : <DashboardFilial />
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
