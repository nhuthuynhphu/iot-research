import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { WorkerPoolModule } from 'src/worker-pool/worker-pool.module';

@Module({
  providers: [MqttService],
  imports: [WorkerPoolModule],
})
export class MqttModule {}
