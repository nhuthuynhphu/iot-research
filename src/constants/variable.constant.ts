export const WORKER_POOL_NAME = {
  TRANSFORM_PAYLOAD: 'transformPayload',
};
export const TOPIC = 'esp8266dht';
export const CACHE_TTL = 10000;
export const TIME_INTERVAL = 5000;
export const MQTT = {
  host: process.env.MQTT_HOST,
  port: parseInt(process.env.MQTT_PORT),
  username: process.env.MQTT_USERNAME || null,
};
