import { currentLoad, mem, fsSize } from 'systeminformation';
import { Injectable, Logger } from '@nestjs/common';
import { Octokit } from '@octokit/rest';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PipelinesGateway } from './pipelines.gateway';
import Docker from 'dockerode';

@Injectable()
export class DashboardService {
  private logger = new Logger('DashboardService')
  private lastData: string = ''
  private docker: Docker;

  constructor(private pipelinesGateway: PipelinesGateway) {
    this.docker = new Docker({ socketPath: '/var/run/docker.sock' } as Docker.DockerOptions);
  }

  async getContainers() {
    const containers: Docker.ContainerInfo[] = await this.docker.listContainers({ all: true });

    return containers.map((c: Docker.ContainerInfo) => ({
      id: c.Id.slice(0, 12),
      name: c.Names?.[0]?.replace('/', '') ?? '',
      status: c.Status ?? '',
      state: c.State ?? '',
      image: c.Image ?? '',
    }));
  }

  async getMetrics() {
    const [cpu, memory, disk] = await Promise.all([
      currentLoad(),
      mem(),
      fsSize(),
    ]);

    const uptime = process?.uptime()
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
      auth: process?.env.GITHUB_TOKEN || 'token'
    });

    const { data } = await octokit.actions.listWorkflowRunsForRepo({
      owner: process?.env.GITHUB_OWNER || 'default',
      repo: process?.env.GITHUB_REPO || 'somerepo',
      per_page: 5
    });

    return data.workflow_runs.map(run => ({
      id: run?.id,
      name: `${run?.name} #${run?.run_number}`,
      commit: run?.head_sha.substring(0, 7),
      commit_message: run?.display_title,
      branch: run?.head_branch,
      status: run.status,
      conclusion: run?.conclusion,
      createdAt: run?.created_at,
      duration: (new Date(run.updated_at).getTime() - new Date(run.created_at).getTime()) / 1000,
      url: run?.html_url
    }))
  }



  @Cron(CronExpression.EVERY_30_SECONDS)
  async checkPipelines() {
    this.logger.log('Checking pipelines . . .')
    try {
      const pipelines = await this.getPipelines()
      const newData = JSON.stringify(pipelines)

      if (newData !== this.lastData) {
        this.logger.log('Pipelines changed, emitting update')
        this.pipelinesGateway.emitPipelinesUpdate(pipelines)
      }
    } catch (error) {
      this.logger.error('Error checking pipelines')
    }
  }
}