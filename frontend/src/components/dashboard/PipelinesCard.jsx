import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from 'lucide-react'

export default function PipelinesCard() {
    const pipelineStatuses = [
      { name: 'deploy-prod', status: 'passed' },
      { name: 'run-tests', status: 'passed' },
      { name: 'build-image', status: 'running' },
      { name: 'lint-check', status: 'failed' },
    ]
  


  return(
    <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Pipeline - Github Actions</CardTitle>
      </CardHeader>
      <CardContent>
        {pipelineStatuses?.map(el => {
          const statusColor = (status) => ({
            passed: 'successful',
            running: 'warning',
            failed: 'destructive',
          }[status] || 'default');
            
          return(
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <p className="text-base">{ el?.name }</p>
                <Badge variant={statusColor(el?.status)}>
                  { el?.status }
                  <BadgeCheck data-icon="inline-start" />
                </Badge>
              </div>
              <div class="flex-1 border-t border-secondary my-2"></div>
            </div>
          )
        })}
      </CardContent>
      <CardFooter className='grid grid-flow-col grid-cols-3 border'>
        <p className="col-span-2">Último deploy: hace 12 min</p>
        <Button variant="outline" size="sm" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
  )
}