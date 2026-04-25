import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { BadgeCheck } from 'lucide-react'
import { Progress } from "../ui/progress";
// import { useEffect, useState } from "react";
import { usePolling } from "@/hooks/usePolling";

export default function ServerHealthCard() {
  const { data } = usePolling(        // ← directly here, not inside any function
    `${import.meta.env.VITE_BACKEND_URL}/dashboard/metrics`
  )  
  console.log(data)  
  const hardwareUsage = [
    { name: 'CPU',    data: data?.cpu    ?? 0  },
    { name: 'Memory', data: data?.memory ?? 0  },
    { name: 'Uptime', data: data?.uptime ?? '...' },
    { name: 'Disk',   data: data?.disk   ?? 0  },
  ]

  return(
    <Card size="sm" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className='font-bold text-gray-300'>Server Health</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-wrap justify-center gap-2 w-full'>
        {hardwareUsage?.map(el => {            
          const colorOnUsage = (usage) => {
            if(usage >= 85) return 'bg-red-500'
            else if(usage >= 55){ return 'bg-yellow-500' }

            return 'bg-green-500'
          }

          return(
            <div className="flex flex-col border border-secondary shadow-lg rounded-md p-3 w-44">
              <div className="flex flex-row justify-between">
              <p className="text-base">{ el?.name }</p>
              { el?.name !== 'Uptime' && <p className="text-lg"> {`${el?.data}%`}</p>}
              </div>
              { el?.name !== 'Uptime' ? <Progress value={el?.data} color={colorOnUsage(el?.data)} /> : el.data }
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