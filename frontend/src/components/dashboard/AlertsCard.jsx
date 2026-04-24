import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const alerts = [
  { id: 1, title: "Mem > 80%",             time: "hace 2 min",  severity: "critical" },
  { id: 2, title: "Deploy fallido en main", time: "hace 12 min", severity: "warning"  },
  { id: 3, title: "Nuevo deploy iniciado",  time: "hace 1 min",  severity: "info"     },
]

const severityConfig = {
  critical: { dot: "bg-red-500",   badge: "destructive" },
  warning:  { dot: "bg-amber-500", badge: "warning" },
  info:     { dot: "bg-blue-500",  badge: "secondary "},
}

export default function AlertsPanel() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Alertas activas</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col divide-y divide-border">
        {alerts.map((alert) => {
          const config = severityConfig[alert.severity]
          return (
            <div key={alert.id} className="flex items-start gap-3 py-3">
              <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${config.dot}`} />
              <div className="flex flex-1 items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}