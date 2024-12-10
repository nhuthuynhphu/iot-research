import { Controller, Param, Sse } from '@nestjs/common';
import { interval, switchMap } from 'rxjs';
import { SseService } from './sse.service';
import { TIME_INTERVAL } from 'src/constants/variable.constant';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse(':topic')
  flightDeckFetchData(@Param('topic') topic: string) {
    return interval(TIME_INTERVAL).pipe(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      switchMap(async (_) => ({
        data: {
          data: await this.sseService.fetchData(topic),
        },
      })),
    );
  }
}
