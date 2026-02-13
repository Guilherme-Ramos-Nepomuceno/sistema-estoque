"use client"

import { useState } from "react"
import { useAppContext, User, ModuleType } from "@/lib/context"
import { Plus, Users, Shield, MapPin, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function BranchesModule() {
    const { branches, users, addUser } = useAppContext()
    const [showAddUserModal, setShowAddUserModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    // Form State
    const [newUserName, setNewUserName] = useState("")
    const [newUserUsername, setNewUserUsername] = useState("")
    const [newUserPassword, setNewUserPassword] = useState("")
    const [newUserBranch, setNewUserBranch] = useState(branches[0].id)
    const [newUserPermissions, setNewUserPermissions] = useState<ModuleType[]>([
        "dashboard",
        "inventory",
        "requests",
    ])

    const modules: { id: ModuleType; label: string }[] = [
        { id: "dashboard", label: "Dashboard" },
        { id: "inventory", label: "Estoque" },
        { id: "fleet", label: "Frota" },
        { id: "requests", label: "Solicitacoes" },
        { id: "keys", label: "Chaves" },
        { id: "movements", label: "Movimentacoes" },
        { id: "reports", label: "Relatorios" },
    ]

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault()
        const newUser: User = {
            id: `USR-${Math.floor(Math.random() * 10000)}`,
            name: newUserName,
            username: newUserUsername,
            password: newUserPassword,
            role: "filial",
            branchId: newUserBranch,
            permissions: newUserPermissions,
        }
        addUser(newUser)
        setShowAddUserModal(false)
        // Reset form
        setNewUserName("")
        setNewUserUsername("")
        setNewUserPassword("")
        setNewUserPermissions(["dashboard", "inventory", "requests"])
    }

    const togglePermission = (module: ModuleType) => {
        setNewUserPermissions((prev) =>
            prev.includes(module) ? prev.filter((p) => p !== module) : [...prev, module]
        )
    }

    const filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Filiais & Acessos</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Gerencie usuarios, permissoes e unidades operacionais
                    </p>
                </div>
                <button
                    onClick={() => setShowAddUserModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Novo Usuario
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Branch List */}
                <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Unidades
                    </h2>
                    <div className="space-y-3">
                        {branches.map((branch) => (
                            <div
                                key={branch.id}
                                className="p-4 rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-medium text-card-foreground">{branch.name}</h3>
                                    <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                                        ID: {branch.id}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">{branch.city}</p>
                                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                                    <Users className="w-3.5 h-3.5" />
                                    {users.filter((u) => u.branchId === branch.id).length} usuarios vinculados
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Users List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            Usuarios do Sistema
                        </h2>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Buscar usuario..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/30 border-b border-border">
                                <tr>
                                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Nome</th>
                                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Funcao</th>
                                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Filial</th>
                                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Permissoes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => {
                                    const userBranch = branches.find((b) => b.id === user.branchId)
                                    return (
                                        <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                                            <td className="px-5 py-3">
                                                <p className="font-medium text-foreground">{user.name}</p>
                                                <p className="text-xs text-muted-foreground">@{user.username}</p>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span
                                                    className={cn(
                                                        "px-2 py-1 rounded-full text-xs font-medium capitalize",
                                                        user.role === "admin"
                                                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                                                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                                    )}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-muted-foreground">
                                                {user.role === "admin" ? "Todas (Central)" : userBranch?.city || "N/A"}
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="flex flex-wrap gap-1">
                                                    {user.permissions.slice(0, 3).map((p) => (
                                                        <span
                                                            key={p}
                                                            className="px-1.5 py-0.5 rounded text-[10px] bg-muted text-muted-foreground border border-border"
                                                        >
                                                            {modules.find((m) => m.id === p)?.label}
                                                        </span>
                                                    ))}
                                                    {user.permissions.length > 3 && (
                                                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-muted text-muted-foreground border border-border">
                                                            +{user.permissions.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            {showAddUserModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-card w-full max-w-lg rounded-xl shadow-xl border border-border animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <h3 className="text-lg font-semibold">Criar Novo Usuario</h3>
                            <button
                                onClick={() => setShowAddUserModal(false)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleCreateUser} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nome Completo</label>
                                    <input
                                        required
                                        value={newUserName}
                                        onChange={(e) => setNewUserName(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20"
                                        placeholder="Ex: Joao Silva"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Username</label>
                                    <input
                                        required
                                        value={newUserUsername}
                                        onChange={(e) => setNewUserUsername(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20"
                                        placeholder="Ex: joaosilva"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Senha Provisoria</label>
                                <input
                                    type="password"
                                    required
                                    value={newUserPassword}
                                    onChange={(e) => setNewUserPassword(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20"
                                    placeholder="********"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Filial de Acesso</label>
                                <select
                                    value={newUserBranch}
                                    onChange={(e) => setNewUserBranch(e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20"
                                >
                                    {branches.map((b) => (
                                        <option key={b.id} value={b.id}>
                                            {b.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium">Permissoes de Modulo</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {modules.map((module) => (
                                        <label
                                            key={module.id}
                                            className={cn(
                                                "flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all",
                                                newUserPermissions.includes(module.id)
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:bg-muted"
                                            )}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={newUserPermissions.includes(module.id)}
                                                onChange={() => togglePermission(module.id)}
                                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm">{module.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddUserModal(false)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                                >
                                    Criar Usuario
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
