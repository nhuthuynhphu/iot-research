import { Inject, Injectable } from '@nestjs/common';
import { CACHE_TTL, WORKER_POOL_NAME } from '../constants/variable.constant';
import { resolve } from 'path';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Piscina = require('piscina');

@Injectable()
export class WorkerPoolService {
  private pool: typeof Piscina;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.pool = new Piscina({
      filename: resolve('src/workers/worker.js'),
    });
  }

  async transformPayload(data) {
    return this.pool.run(
      {
        data,
      },
      { name: WORKER_POOL_NAME.TRANSFORM_PAYLOAD },
    );
  }

  async saveToMemoryDB(topic, data) {
    await this.cacheManager.set(topic, data, CACHE_TTL);
  }
}
