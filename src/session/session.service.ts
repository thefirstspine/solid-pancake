import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { Repository } from 'typeorm';
import uniqid = require('uniqid');
import { LogsService } from '@thefirstspine/logs-nest';

@Injectable()
export class SessionService {

  constructor(
    private readonly logsService: LogsService,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async createSession(product: string, label: string = '', version: string = ''): Promise<Session|null> {
    try {
      // Create ID
      const sessionId: string = uniqid();

      // Create session
      const session: Session = new Session();
      session.product = product;
      session.label = label;
      session.version = version;
      session.session_id = sessionId;

      // Insert
      await this.sessionRepository.insert(session);

      // Return the entity
      return this.sessionRepository.findOne({session_id: sessionId});
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

}
