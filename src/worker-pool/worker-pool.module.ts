import { Module } from '@nestjs/common';
import { WorkerPoolService } from './worker-pool.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [WorkerPoolService],
  exports: [WorkerPoolService],
  imports: [CacheModule.register()],
})
export class WorkerPoolModule {}
