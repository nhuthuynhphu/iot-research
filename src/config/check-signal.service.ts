import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MQTT, TOPIC } from 'src/constants/variable.constant';

@Injectable()
export class CheckSignalService {
  private logger = new Logger(CheckSignalService.name);
  count = 0;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkSignal() {
    if (!MQTT.host || !MQTT.port) return;
    const cacheValue = await this.cacheManager.get(TOPIC);
    if (cacheValue && this.count > 0) {
      this.logger.log('reconnected!');
      this.count = 0;
      return;
    }
    if (this.count > 4) return;
    this.logger.error('signal lost...');
    this.count++;
  }
}
