import { Injectable, Logger } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';
import { filter, Observable, of, switchMap } from 'rxjs';
import { WorkerPoolService } from '../worker-pool/worker-pool.service';
import { MQTT, TOPIC } from 'src/constants/variable.constant';

@Injectable()
export class MqttService {
  private mqttClient: MqttClient;
  private logger = new Logger(MqttService.name);

  constructor(private readonly pool: WorkerPoolService) {
    if (!MQTT.host || !MQTT.port) {
      this.logger.log('MQTT skip setup due to missing HOST or PORT MQTT env');
      return;
    }

    const connectUrl = `mqtt://${MQTT.host}:${MQTT.port}`;
    this.mqttClient = connect(connectUrl);

    this.mqttClient.on('error', (e) => {
      this.logger.error('MQTT error.', e.message);
      this.logger.error(e);
    });

    this.mqttClient.on('reconnect', () => {
      this.logger.debug('MQTT client is reconnecting...');
    });

    this.mqttClient.on('close', () => {
      this.logger.debug('MQTT client is disconnected.');
    });

    this.mqttClient.on('connect', () => {
      this.logger.log('MQTT CONNECTED');

      if (this.mqttClient.connected) {
        const topics = [TOPIC];
        this.logger.log('START MQTT TOPICS');
        this.logger.log(topics);
        this.logger.log('END MQTT TOPICS');

        this.mqttClient?.subscribe(topics);
      }
    });

    this.mqttClient.on('message', (topic, payload) => {
      this.subscribeToTopicMCU(topic, payload);
    });
  }

  async subscribeToTopicMCU(topic, payload) {
    const parsePayload = JSON.parse(payload.toString('utf-8'));
    const data: Observable<any[]> = of(parsePayload);
    await data
      .pipe(
        filter((val) => val.length > 0),
        switchMap(async (data) => {
          const payloadTransformed = await this.pool.transformPayload(data);
          this.logger.log('received data', data);
          await this.pool.saveToMemoryDB(topic, payloadTransformed);
        }),
      )
      .toPromise();
  }
}
