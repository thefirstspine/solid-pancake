import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { Repository, InsertResult } from 'typeorm';
import { LogsService } from '@thefirstspine/logs-nest';
import { Session } from 'src/session/session.entity';

@Injectable()
export class EventService {

  constructor(
    private readonly logsService: LogsService,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async addEvent(sessionId: string, eventType: string, category: string = '', action: string = '', label: string = ''): Promise<Event|null> {
    try {
      // Create session
      const event: Event = new Event();
      event.session_id = sessionId;
      event.event = eventType;
      event.category = category;
      event.action = action;
      event.label = label;

      // Insert
      const result: InsertResult = await this.eventRepository.insert(event);

      // Return the entity
      return this.eventRepository.findOne({event_id: result.identifiers[0].event_id});
    } catch (e) {
      // Log error before returning something
      this.logsService.error(e.message, {
        message: e.message,
        name: e.name,
        stack: e.stack,
      });
      return null;
    }
  }

  async request(offset: number, limit: number, filters: {[key: string]: any}) {
    return await this.eventRepository.find({
      where: filters,
      take: limit,
      skip: offset,
      order: {
        created_at: 'DESC',
      },
    });
  }

}
