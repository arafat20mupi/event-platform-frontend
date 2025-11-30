import type { ReactNode } from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface DashboardStatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  subtext?: string
}

export function DashboardStatCard({ title, value, icon, trend, subtext }: DashboardStatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold mb-1">{value}</div>
          {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
        </div>

        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            {trend.isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {trend.value}%
          </div>
        )}
      </div>
    </div>
  )
}
