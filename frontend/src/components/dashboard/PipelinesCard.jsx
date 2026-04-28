import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from 'lucide-react'
import { useEffect } from "react";

export default function PipelinesCard() {
  const backendAPI = `${import.meta.env.VITE_BACKEND_URL}/dashboard/pipelines`
    const pipelineStatuses = [
      { name: 'deploy-prod', status: 'passed' },
      { name: 'run-tests', status: 'passed' },
      { name: 'build-image', status: 'running' },
      { name: 'lint-check', status: 'failed' },
    ]
      
    
  const getPipelines = async () => {
    try {
      const res = await fetch(backendAPI, {
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.error('SERVER ERROR');
      console.error(e);
    }
  };


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
            <div key={el?.name} className="flex flex-col">
              <div className="flex flex-row justify-between">
                <p className="text-base">{ el?.name }</p>
                <Badge variant={statusColor(el?.status)}>
                  { el?.status }
                  <BadgeCheck data-icon="inline-start" />
                </Badge>
              </div>
              <div className="flex-1 border-t border-secondary my-2"></div>
            </div>
          )
        })}
      </CardContent>
      <CardFooter className='grid grid-flow-col grid-cols-3 border'>
        <p className="col-span-2">Último deploy: hace 12 min</p>
        <Button onClick={() => getPipelines()} variant="outline" size="sm" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
  )
}