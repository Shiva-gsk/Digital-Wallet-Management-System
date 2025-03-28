import { UsersTable } from "@/components/admin/users-table"
import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"

export default function UsersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Users" text="Manage all users and their digital wallets." />
      <UsersTable />
    </DashboardShell>
  )
}

