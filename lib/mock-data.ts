// --- Central Dashboard Data ---
export const centralKPIs = {
  totalItems: 12847,
  totalItemsChange: 3.2,
  pendingOrders: 23,
  pendingOrdersChange: -12,
  fleetAlerts: 7,
  fleetAlertsChange: 2,
  monthlySpend: 284500,
  monthlySpendChange: -5.8,
}

export const branchConsumption = [
  { name: "Curitiba", consumo: 4200, meta: 5000 },
  { name: "Sao Paulo", consumo: 6800, meta: 7000 },
  { name: "Belo Horizonte", consumo: 3100, meta: 4000 },
  { name: "Rio de Janeiro", consumo: 5400, meta: 5500 },
]

export const monthlyConsumption = [
  { mes: "Jul", central: 18000, filiais: 32000 },
  { mes: "Ago", central: 21000, filiais: 28000 },
  { mes: "Set", central: 19000, filiais: 35000 },
  { mes: "Out", central: 24000, filiais: 31000 },
  { mes: "Nov", central: 22000, filiais: 38000 },
  { mes: "Dez", central: 26000, filiais: 34000 },
  { mes: "Jan", central: 20000, filiais: 30000 },
]

export const recentOrders = [
  { id: "PED-2401", filial: "Curitiba - Industrial", items: 12, status: "aprovado", date: "10 Fev 2026", total: "R$ 3.450,00" },
  { id: "PED-2402", filial: "Sao Paulo - Centro", items: 8, status: "pendente", date: "11 Fev 2026", total: "R$ 1.280,00" },
  { id: "PED-2403", filial: "Belo Horizonte - Contagem", items: 5, status: "pendente", date: "11 Fev 2026", total: "R$ 890,00" },
  { id: "PED-2404", filial: "Rio de Janeiro - Duque de Caxias", items: 20, status: "em_transito", date: "09 Fev 2026", total: "R$ 6.720,00" },
  { id: "PED-2405", filial: "Curitiba - Industrial", items: 3, status: "entregue", date: "08 Fev 2026", total: "R$ 540,00" },
]

export const fleetMaintenanceAlerts = [
  { vehicle: "Fiat Ducato - ABC-1234", type: "Troca de oleo", status: "vencido", km: "45.000 km", deadline: "01 Fev 2026" },
  { vehicle: "VW Delivery - DEF-5678", type: "Revisao geral", status: "proximo", km: "78.500 km", deadline: "20 Fev 2026" },
  { vehicle: "Mercedes Sprinter - GHI-9012", type: "Troca de pneus", status: "ok", km: "32.000 km", deadline: "15 Mar 2026" },
  { vehicle: "Iveco Daily - JKL-3456", type: "Pastilha de freio", status: "vencido", km: "61.200 km", deadline: "05 Fev 2026" },
]

// --- Filial Dashboard Data ---
export const filialKPIs = {
  localStock: 2341,
  localStockChange: 1.5,
  pendingReceipts: 4,
  pendingReceiptsChange: -2,
  activeVehicles: 6,
  activeMissions: 3,
  keysOut: 4,
}

export const filialRecentMovements = [
  { id: "MOV-001", item: "Filtro de Oleo Bosch OF-0101", type: "saida", qty: 2, operator: "Carlos Silva", date: "12 Fev 2026 09:15" },
  { id: "MOV-002", item: "Resma A4 Chamex 500fls", type: "entrada", qty: 50, operator: "Ana Souza", date: "12 Fev 2026 08:42" },
  { id: "MOV-003", item: "Luva Nitrilica M (cx 100un)", type: "saida", qty: 5, operator: "Pedro Lima", date: "11 Fev 2026 17:30" },
  { id: "MOV-004", item: "Desengripante WD-40 300ml", type: "saida", qty: 3, operator: "Carlos Silva", date: "11 Fev 2026 15:10" },
  { id: "MOV-005", item: "Oleo Motor 15W40 Mobil 1L", type: "entrada", qty: 24, operator: "Ana Souza", date: "11 Fev 2026 10:00" },
]

export const filialFleetStatus = [
  { vehicle: "Fiat Ducato - ABC-1234", driver: "Joao Mendes", status: "em_missao", kmSaida: 44800, destination: "Cliente Alphaville" },
  { vehicle: "VW Delivery - DEF-5678", driver: "---", status: "disponivel", kmSaida: 0, destination: "---" },
  { vehicle: "Mercedes Sprinter - GHI-9012", driver: "Roberto Costa", status: "em_missao", kmSaida: 31800, destination: "Deposito Central" },
  { vehicle: "Iveco Daily - JKL-3456", driver: "---", status: "manutencao", kmSaida: 0, destination: "---" },
]

export const filialKeyCustody = [
  { vehicle: "Fiat Ducato - ABC-1234", responsavel: "Joao Mendes", retirada: "12 Fev 2026 07:30", previsaoRetorno: "12 Fev 2026 18:00" },
  { vehicle: "Mercedes Sprinter - GHI-9012", responsavel: "Roberto Costa", retirada: "12 Fev 2026 08:00", previsaoRetorno: "12 Fev 2026 14:00" },
  { vehicle: "Caminhonete Hilux - MNO-7890", responsavel: "Marcos Oliveira", retirada: "12 Fev 2026 06:45", previsaoRetorno: "12 Fev 2026 12:00" },
  { vehicle: "Fiorino - PQR-1122", responsavel: "Luciana Santos", retirada: "12 Fev 2026 09:00", previsaoRetorno: "12 Fev 2026 16:00" },
]

// --- Inventory Module Data ---
export const catalogItems = [
  { id: "SKU-001", name: "Filtro de Oleo Bosch OF-0101", category: "Automotivo", unit: "UN", minStock: 10, currentStock: 24, price: "R$ 32,90", barcode: "7891234560011" },
  { id: "SKU-002", name: "Resma A4 Chamex 500fls", category: "Escritorio", unit: "PCT", minStock: 20, currentStock: 85, price: "R$ 24,50", barcode: "7891234560022" },
  { id: "SKU-003", name: "Luva Nitrilica M (cx 100un)", category: "EPI", unit: "CX", minStock: 5, currentStock: 3, price: "R$ 68,00", barcode: "7891234560033" },
  { id: "SKU-004", name: "Desengripante WD-40 300ml", category: "Manutencao", unit: "UN", minStock: 8, currentStock: 15, price: "R$ 28,90", barcode: "7891234560044" },
  { id: "SKU-005", name: "Oleo Motor 15W40 Mobil 1L", category: "Automotivo", unit: "UN", minStock: 12, currentStock: 36, price: "R$ 42,00", barcode: "7891234560055" },
  { id: "SKU-006", name: "Parafuso Sextavado M10x40 (pct 50)", category: "Fixacao", unit: "PCT", minStock: 10, currentStock: 8, price: "R$ 18,50", barcode: "7891234560066" },
  { id: "SKU-007", name: "Fita Isolante 20m Tramontina", category: "Eletrica", unit: "UN", minStock: 15, currentStock: 42, price: "R$ 8,90", barcode: "7891234560077" },
  { id: "SKU-008", name: "Graxeira Manual 500ml", category: "Ferramentas", unit: "UN", minStock: 3, currentStock: 5, price: "R$ 145,00", barcode: "7891234560088" },
]

// --- Fleet Module Data ---
export const fleetVehicles = [
  { id: "VH-001", plate: "ABC-1234", model: "Fiat Ducato 2.3 Multijet", year: 2023, km: 44800, status: "em_missao", nextMaintenance: "45.000 km", fuelLevel: 65 },
  { id: "VH-002", plate: "DEF-5678", model: "VW Delivery 11.180", year: 2022, km: 78500, status: "disponivel", nextMaintenance: "80.000 km", fuelLevel: 90 },
  { id: "VH-003", plate: "GHI-9012", model: "Mercedes Sprinter 416", year: 2024, km: 31800, status: "em_missao", nextMaintenance: "35.000 km", fuelLevel: 45 },
  { id: "VH-004", plate: "JKL-3456", model: "Iveco Daily 35-150", year: 2021, km: 61200, status: "manutencao", nextMaintenance: "60.000 km", fuelLevel: 30 },
  { id: "VH-005", plate: "MNO-7890", model: "Toyota Hilux 2.8 SRX", year: 2024, km: 18200, status: "em_missao", nextMaintenance: "20.000 km", fuelLevel: 78 },
  { id: "VH-006", plate: "PQR-1122", model: "Fiat Fiorino 1.4 Flex", year: 2023, km: 52300, status: "em_missao", nextMaintenance: "55.000 km", fuelLevel: 55 },
]

// --- Requests Module Data ---
export const supplyRequests = [
  { id: "SOL-001", filial: "Curitiba - Industrial", items: 5, status: "pendente", requester: "Carlos Silva", date: "12 Fev 2026", urgency: "normal" },
  { id: "SOL-002", filial: "Sao Paulo - Centro", items: 12, status: "aprovada", requester: "Maria Santos", date: "11 Fev 2026", urgency: "urgente" },
  { id: "SOL-003", filial: "Belo Horizonte - Contagem", items: 3, status: "em_separacao", requester: "Pedro Lima", date: "10 Fev 2026", urgency: "normal" },
  { id: "SOL-004", filial: "Rio de Janeiro - Duque de Caxias", items: 8, status: "enviada", requester: "Ana Costa", date: "09 Fev 2026", urgency: "normal" },
  { id: "SOL-005", filial: "Curitiba - Industrial", items: 2, status: "recebida", requester: "Carlos Silva", date: "07 Fev 2026", urgency: "urgente" },
]
