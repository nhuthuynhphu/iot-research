import { Module } from '@nestjs/common';
import { SseController } from './sse.controller';
import { SseService } from './sse.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [SseController],
  providers: [SseService],
})
export class SseModule {}
