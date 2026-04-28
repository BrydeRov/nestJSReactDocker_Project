import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePolling } from "@/hooks/usePolling";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Clock,
  Ban,
  MinusCircle,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { usePipelines } from "@/hooks/usePipelines";
import { Skeleton } from "../ui/skeleton";


export default function PipelinesCard() {
  const { pipelines, connected } = usePipelines()

  return(
    <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Pipeline - Github Actions</CardTitle>
      </CardHeader>
      <CardContent>
        {pipelines?.map((el, index) => {
        
        
      const statusColor = (status) =>
        ({
          success: "success",
          failure: "failure",
          in_progress: "in_progress",
          queued: "queued",
          cancelled: "cancelled",
          skipped: "skipped",
        }[status] ?? "default");

          
        const iconBadge = (status) => ({
            success: <CheckCircle data-icon="inline-start" />,
            failure: <XCircle data-icon="inline-start" />,
            in_progress: ( <Loader2 data-icon="inline-start" className="animate-spin" />),
            queued: <Clock data-icon="inline-start" />,
            cancelled: <Ban data-icon="inline-start" />,
            skipped: <MinusCircle data-icon="inline-start" />,
            timed_out: <AlertTriangle data-icon="inline-start" />,
          }[status] || <HelpCircle data-icon="inline-start" />);

          return(
            <div key={index} className="flex flex-col">
              <div className="flex flex-row justify-between">
                <p className="text-base">{ el?.name }</p>
                <Badge variant={statusColor(el?.conclusion)}>
                  { el?.conclusion ?? el?.status}
                  { iconBadge(el?.conclusion)}
                </Badge>
              </div>
              <div className="flex-1 border-t border-secondary my-2"></div>
            </div>
          )
        })}
        {pipelines?.length === 0 &&  Array.from({ length: 3 }, (_, i) => (
          <div className="flex flex-col my-2">
            <div className="flex flex-row justify-between w-full">
              <Card className='w-full'>
                <CardContent className='flex flex-row justify-between'>
                  <Skeleton className="h-6 w-32 rounded-md my-auto" />
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </CardContent>
              </Card>
            </div>
          </div>
        ))
}
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