"use client"

import { cn } from "@/lib/utils"

type StatusType =
  | "aprovado" | "pendente" | "em_transito" | "entregue"
  | "vencido" | "proximo" | "ok"
  | "em_missao" | "disponivel" | "manutencao"
  | "aprovada" | "em_separacao" | "enviada" | "recebida"
  | "urgente" | "normal"
  | "entrada" | "saida"

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  aprovado: { label: "Aprovado", className: "bg-success/10 text-success" },
  pendente: { label: "Pendente", className: "bg-warning/10 text-warning" },
  em_transito: { label: "Em Transito", className: "bg-primary/10 text-primary" },
  entregue: { label: "Entregue", className: "bg-success/10 text-success" },
  vencido: { label: "Vencido", className: "bg-destructive/10 text-destructive" },
  proximo: { label: "Proximo", className: "bg-warning/10 text-warning" },
  ok: { label: "OK", className: "bg-success/10 text-success" },
  em_missao: { label: "Em Missao", className: "bg-primary/10 text-primary" },
  disponivel: { label: "Disponivel", className: "bg-success/10 text-success" },
  manutencao: { label: "Manutencao", className: "bg-destructive/10 text-destructive" },
  aprovada: { label: "Aprovada", className: "bg-success/10 text-success" },
  em_separacao: { label: "Em Separacao", className: "bg-primary/10 text-primary" },
  enviada: { label: "Enviada", className: "bg-primary/10 text-primary" },
  recebida: { label: "Recebida", className: "bg-success/10 text-success" },
  urgente: { label: "Urgente", className: "bg-destructive/10 text-destructive" },
  normal: { label: "Normal", className: "bg-muted text-muted-foreground" },
  entrada: { label: "Entrada", className: "bg-success/10 text-success" },
  saida: { label: "Saida", className: "bg-warning/10 text-warning" },
}

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status as StatusType] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  )
}
