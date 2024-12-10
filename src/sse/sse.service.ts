import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class SseService {
  constructor(@Inject(CACHE_MANAGER) public cacheManager: Cache) {}

  /**
   * Get data
   * @param topic
   * @returns
   */
  async fetchData(topic: string) {
    return this.cacheManager.get(topic);
  }
}
