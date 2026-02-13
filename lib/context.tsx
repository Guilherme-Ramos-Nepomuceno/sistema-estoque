"use client"

import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from "react"
import { catalogItems } from "./mock-data"

export type ViewMode = "central" | "filial"

export interface Branch {
  id: string
  name: string
  city: string
}

export type ModuleType =
  | "dashboard"
  | "inventory"
  | "fleet"
  | "requests"
  | "keys"
  | "movements"
  | "branches"
  | "reports"

export interface User {
  id: string
  name: string
  username: string
  password?: string // In a real app, this would be hashed or handled by a backend
  role: "admin" | "filial"
  branchId?: string
  permissions: ModuleType[]
}

const branches: Branch[] = [
  { id: "1", name: "Unidade Curitiba - Industrial", city: "Curitiba" },
  { id: "2", name: "Unidade Sao Paulo - Centro", city: "Sao Paulo" },
  { id: "3", name: "Unidade Belo Horizonte - Contagem", city: "Belo Horizonte" },
  { id: "4", name: "Unidade Rio de Janeiro - Duque de Caxias", city: "Rio de Janeiro" },
]

// Mock initial users
const initialUsers: User[] = [
  {
    id: "admin",
    name: "Administrador",
    username: "admin",
    role: "admin",
    permissions: ["dashboard", "inventory", "fleet", "requests", "keys", "movements", "branches", "reports"],
  },
]

interface AppContextType {
  // Navigation & UI
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  selectedBranch: Branch
  setSelectedBranch: (branch: Branch) => void
  branches: Branch[]
  sidebarOpen: boolean
  toggleSidebar: () => void

  // Auth
  user: User | null
  login: (username: string) => boolean
  logout: () => void

  // User Management
  users: User[]
  addUser: (user: User) => void

  // Item Visibility (Central -> Filial)
  // Maps ItemID -> Array of BranchIDs who can see it
  itemVisibility: Record<string, string[]>
  toggleItemVisibility: (itemId: string, branchId: string) => void
  isItemVisible: (itemId: string, branchId: string) => boolean
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("central")
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])


  // Auth State
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>(initialUsers)

  // Visibility State (Default: all items visible to all branches initially, or none? Let's say all for now)
  // Initialize with all items visible to all branches for backward compatibility mock
  const [itemVisibility, setItemVisibility] = useState<Record<string, string[]>>(() => {
    const visibility: Record<string, string[]> = {}
    catalogItems.forEach(item => {
      visibility[item.id] = branches.map(b => b.id)
    })
    return visibility
  })

  const login = useCallback((username: string) => {
    const foundUser = users.find(u => u.username === username)
    if (foundUser) {
      setUser(foundUser)
      if (foundUser.role === "admin") {
        setViewMode("central")
      } else {
        setViewMode("filial")
        // If user is bound to a branch, select it
        if (foundUser.branchId) {
          const userBranch = branches.find(b => b.id === foundUser.branchId)
          if (userBranch) setSelectedBranch(userBranch)
        }
      }
      return true
    }
    return false
  }, [users])

  const logout = useCallback(() => {
    setUser(null)
    setViewMode("central")
  }, [])

  const addUser = useCallback((newUser: User) => {
    setUsers(prev => [...prev, newUser])
  }, [])

  const toggleItemVisibility = useCallback((itemId: string, branchId: string) => {
    setItemVisibility(prev => {
      const current = prev[itemId] || []
      const isVisible = current.includes(branchId)
      let newVisibility
      if (isVisible) {
        newVisibility = current.filter(id => id !== branchId)
      } else {
        newVisibility = [...current, branchId]
      }
      return { ...prev, [itemId]: newVisibility }
    })
  }, [])

  const isItemVisible = useCallback((itemId: string, branchId: string) => {
    // If no record exists, assume visible (or hidden? Let's assume visible for simplicity unless explicitly restricted)
    // Actually, let's use the state.
    // If we want items to be hidden by default for new items, we should handle that. 
    // BUT for the mock, we initialized everything as visible.
    const visibility = itemVisibility[itemId]
    if (!visibility) return false // Safest default if id not found
    return visibility.includes(branchId)
  }, [itemVisibility])

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        selectedBranch,
        setSelectedBranch,
        branches,
        sidebarOpen,
        toggleSidebar,
        user,
        login,
        logout,
        users,
        addUser,
        itemVisibility,
        toggleItemVisibility,
        isItemVisible
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}
