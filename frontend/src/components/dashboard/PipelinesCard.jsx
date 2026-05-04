import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Clock,
  Ban,
  MinusCircle,
  AlertTriangle,
  HelpCircle,
  GitBranch, 
  GitCommit,
} from 'lucide-react';
import { usePipelines } from "@/hooks/usePipelines";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { formatDistanceToNow } from "date-fns";

export default function PipelinesCard() {
  const { pipelines, connected } = usePipelines()
  const [page, setPage] = useState(0);

  const ITEMS_PER_PAGE = 2;
  const totalPages = Math.ceil((pipelines?.length || 0) / ITEMS_PER_PAGE);
  const paginatedPipelines = pipelines?.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );
  
  useEffect(() => {
    setPage(0);
  }, [pipelines]);

  return(
    <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Pipeline - Github Actions</CardTitle>
      </CardHeader>
      <CardContent className='gap-2'>
        {paginatedPipelines?.map((el, index) => {
          
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
              <Card key={index} size='sm' className="w-full hover:bg-muted/50 transition-colors m-1">
                <CardContent className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-medium">
                      {el?.name}
                    </h3>
                    <Badge variant={statusColor(el?.conclusion)} className="flex shrink-0 items-center gap-1">
                      {el?.conclusion ?? el?.status}
                      {iconBadge(el?.conclusion)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {el?.commit_message}
                  </p>
                  <Badge
                    onClick={() =>
                      window.open(
                        `https://github.com/bryderov/nestJSReactDocker_Project/commit/${el?.commit}`,
                        "_blank"
                      )
                    }
                    variant="outline"
                    className="flex w-fit items-center gap-2 bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground hover:cursor-pointer hover:bg-secondary"
                  >
                    <span className="flex items-center gap-1">
                      <GitBranch className="h-3 w-3" />
                      {el?.branch}
                    </span>
                    <span className="opacity-60">•</span>
                    <span className="flex items-center gap-1">
                      <GitCommit className="h-3 w-3" />
                      {el?.commit?.slice(0, 7)}
                    </span>
                  </Badge>
                </CardContent>
              </Card>
            )
        })}
        {pipelines?.length === 0 &&  Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex flex-col my-2">
              <div className="flex flex-row justify-between w-full">
                <Card className='w-full'>
                  <CardContent className='flex flex-row justify-between'>
                    <Skeleton className="h-6 w-32 rounded-md my-auto" />
                    <Skeleton className="h-8 w-20 rounded-lg" />
                  </CardContent>
                </Card>
              </div>
            </div>
        ))}
      </CardContent>
    <CardFooter className='flex flex-row justify-between'>
      <p className="my-auto">
        Last deploy: 
        {pipelines?.length > 0 && formatDistanceToNow(new Date(pipelines?.[0]?.createdAt), {
          addSuffix: true,
        })}
      </p>
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <span className="text-xs text-muted-foreground">
          Page {page + 1} of {totalPages || 1}
        </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setPage((p) => Math.min(p + 1, totalPages - 1))
            }
            disabled={page >= totalPages - 1}
          >
            Next
          </Button>
      </div>
      </CardFooter>
    </Card>
  )
}