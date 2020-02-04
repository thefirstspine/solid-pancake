import { Injectable } from '@nestjs/common';
import { SessionService } from 'src/session/session.service';
import { EventService } from 'src/event/event.service';

@Injectable()
export class ApiService {

  constructor(
    private readonly sessionService: SessionService,
    private readonly eventService: EventService,
  ) {}

  public createSession(product: string, label: string = '', version: string = '') {
    return this.sessionService.createSession(product, label, version);
  }

  public addEvent(sessionId: string, event: string, category: string = '', action: string = '', label: string = '') {
    return this.eventService.addEvent(sessionId, event, category, action, label);
  }

}
