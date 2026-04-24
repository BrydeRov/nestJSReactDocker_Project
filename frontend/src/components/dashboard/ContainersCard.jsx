import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from 'lucide-react'

export default function ContainersCard() {
    const containersStatus = [
      { name: 'frontend', status: 'healthy', reboots: 0 },
      { name: 'backend-api', status: 'healthy', reboots: 0 },
      { name: 'prometheus', status: 'degraded', reboots: 3 },
    ]
  


  return(
    <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Containers - Docker</CardTitle>
      </CardHeader>
      <CardContent>
        {containersStatus?.map(el => {
          const statusColor = (status) => ({
            healthy: 'successful',
            degraded: 'warning',
            failed: 'destructive',
          }[status] || 'default');
            
          return(
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                  <div className='flex flex-col'>
                    <p className="text-sm">{el?.name}</p>
                    <p className="text-xs">{el?.reboots} reebots</p>
                  </div>
                <Badge variant={statusColor(el?.status)}>
                  {el?.status}
                  <BadgeCheck data-icon="inline-start" />
                </Badge>
              </div>
              <div class="flex-1 border-t border-secondary my-2"></div>
            </div>
          )
        })}
      </CardContent>
      {/* <CardFooter className='grid grid-flow-col grid-cols-3 border'>
        <p className="col-span-2">Último deploy: hace 12 min</p>
        <Button variant="outline" size="sm" className="w-full">
          Action
        </Button>
      </CardFooter> */}
    </Card>
  )
}