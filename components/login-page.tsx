"use client"

import { useState } from "react"
import { useAppContext } from "@/lib/context"
import { ShieldCheck, Truck, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function LoginPage() {
    const { login } = useAppContext()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        if (username === "admin" && password === "admin") {
            const success = login("admin")
            if (!success) setError("Erro interno ao realizar login admin")
        } else {
            // For other users, we rely on the context to find them by username
            // For now, simple mock: username matches -> login ok (password ignored for mock simplicity on custom users)
            // BUT, let's try to match existing logic. The context `login` function only checks username existence currently.
            // We should ideally check password, but the context doesn't store passwords securely or at all for the mock user list except in comment.
            // So we will just pass the username to login().
            const success = login(username)
            if (!success) {
                setError("Usuario nao encontrado ou credenciais invalidas")
            }
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg p-8">
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                        <Truck className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">Sistema de Estoque</h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Gestao de frota, inventario e filiais
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-foreground block mb-1.5">
                            Usuario
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Digite seu usuario..."
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-foreground block mb-1.5">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Digite sua senha..."
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={cn(
                            "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all text-primary-foreground shadow-sm mt-2",
                            isLoading ? "bg-primary/70 cursor-not-allowed" : "bg-primary hover:bg-primary/90"
                        )}
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <ShieldCheck className="w-4 h-4" />
                                Acessar Sistema
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-border text-center">
                    <p className="text-xs text-muted-foreground">
                        Acesso Restrito - v1.0.2
                    </p>
                    <p className="text-[10px] text-muted-foreground/50 mt-1">
                        Para testes use: <strong>admin</strong> / <strong>admin</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}
