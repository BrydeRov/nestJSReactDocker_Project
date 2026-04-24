import { currentLoad, mem, fsSize } from 'systeminformation';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async getMetrics() {
    const [cpu, memory, disk] = await Promise.all([
      currentLoad(),
      mem(),
      fsSize(),
    ]);

    return {
      cpu: Math.round(cpu.currentLoad),
      memory: Math.round((memory.used / memory.total) * 100),
      uptime: Math.round(process.uptime()),
      disk: Math.round(disk[0].use),
    };
  }
}