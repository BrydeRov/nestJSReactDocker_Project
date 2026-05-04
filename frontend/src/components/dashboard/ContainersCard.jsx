import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { usePolling } from "@/hooks/usePolling";

export default function ContainersCard() {
  const { data, error } = usePolling(
    `${import.meta.env.VITE_BACKEND_URL}/dashboard/containers`
  )

  if (error) return (
    <Card className="w-full max-w-sm">
      <CardHeader><CardTitle>Containers - Docker</CardTitle></CardHeader>
      <CardContent>
        <p className="text-sm text-destructive">Could not reach Docker socket</p>
      </CardContent>
    </Card>
  )

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Containers - Docker</CardTitle>
        <span className="text-xs text-muted-foreground">
          {data ? `${data.length} containers` : '...'}
        </span>
      </CardHeader>

      <CardContent>
        {!data && (
          <p className="text-sm text-muted-foreground">Loading...</p>
        )}

        {data?.map((container) => {
          const statusConfig = {
            created:    { color: 'ghost',       icon: Loader2        },
            restarting: { color: 'secondary',   icon: Loader2        },
            running:    { color: 'success',     icon: Container     },
            paused:     { color: 'secondary',   icon: AlertTriangle  },
            removing:   { color: 'secondary',   icon: Loader2        },
            exited:     { color: 'destructive', icon: XCircle        },
            dead:       { color: 'destructive', icon: XCircle        },
          }
          const config = statusConfig[container.state] ?? { color: 'default', icon: Loader2 }
          const Icon = config.icon

          return (
            <div key={container.id} className="flex flex-col">
              <div className="flex flex-row items-center justify-between py-1">
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{container.name}</p>
                  <p className="text-xs text-muted-foreground">{container.status}</p>
                </div>
                <Badge variant={config?.color} className="gap-1">
                  <Icon className="h-3 w-3" />
                  {container?.state}
                </Badge>
              </div>
              <div className="border-t border-border my-1" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}