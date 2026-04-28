import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from 'lucide-react'
import { useEffect, useState } from "react";
import { usePolling } from "@/hooks/usePolling";

export default function PipelinesCard() {
  const { data } = usePolling(`${import.meta.env.VITE_BACKEND_URL}/dashboard/pipelines`)
  console.log(data)
  return(
    <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Pipeline - Github Actions</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.map((el, index) => {
          const statusColor = (status) => ({
            success: 'successful',
            running: 'warning',
            failure: 'destructive',
          }[status] || 'default');
            
          return(
            <div key={index} className="flex flex-col">
              <div className="flex flex-row justify-between">
                <p className="text-base">{ el?.name }</p>
                <Badge variant={statusColor(el?.conclusion)}>
                  { el?.conclusion }
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
        <Button variant="outline" size="sm" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
  )
}