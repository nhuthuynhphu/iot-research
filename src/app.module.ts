import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttModule } from './mqtt/mqtt.module';
import { WorkerPoolModule } from './worker-pool/worker-pool.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CheckSignalService } from './config/check-signal.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { SseModule } from './sse/sse.module';

@Module({
  imports: [
    MqttModule,
    WorkerPoolModule,
    ScheduleModule.forRoot(),
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: '.env',
    }),
    SseModule,
  ],
  controllers: [AppController],
  providers: [AppService, CheckSignalService],
})
export class AppModule {}
