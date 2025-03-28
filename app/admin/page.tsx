import { DashboardHeader } from "@/components/admin/dashboard-header"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { AnalyticsCards } from "@/components/admin/analytics-cards"
import { TransactionChart } from "@/components/admin/transaction-chart"
import { UserActivityChart } from "@/components/admin/user-activity-chart"
import { TransactionTypeChart } from "@/components/admin/transaction-type-chart"
import { RecentUsers } from "@/components/admin/recent-users"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your digital wallet management system." />
      <AnalyticsCards />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <div className="col-span-4">
          <TransactionChart />
        </div>
        <div className="col-span-3">
          <TransactionTypeChart />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <UserActivityChart />
        <RecentUsers />
      </div>
    </DashboardShell>
  )
}

