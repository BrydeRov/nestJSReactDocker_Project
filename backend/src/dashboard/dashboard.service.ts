import { currentLoad, mem, fsSize } from 'systeminformation';
import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/rest';

@Injectable()
export class DashboardService {
  async getMetrics() {
    const [cpu, memory, disk] = await Promise.all([
      currentLoad(),
      mem(),
      fsSize(),
    ]);

    const uptime = process.uptime()
    const hours = Math.floor(uptime / 3600)
    const mins = Math.floor((uptime % 3600) / 60)

    return {
      cpu: Math.round(cpu.currentLoad),
      memory: Math.round((memory.active / memory.total) * 100),
      uptime: `${hours}h ${mins}m`,
      disk: Math.round(disk[0].use),
    };
  }

  async getPipelines() {
    const octokit = new Octokit({
      auth: 'token'
    })
    const { data } = await octokit.actions.listWorkflowRunsForRepo({
      owner: process.env.GITHUB_OWNER || 'default',
      repo: process.env.GITHUB_REPO || 'somerepo',
      per_page: 5
    });

    data?.json(data.workflow_runs.map(run => ({
      id: run?.id,
      name: run?.name,
      status: run.status,
      conclusion: run?.conclusion,
      duration: run?.duration
    })))
  }
}