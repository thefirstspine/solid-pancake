import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { Repository, InsertResult } from 'typeorm';
import { LogService } from '../@shared/log-shared/log.service';
import uniqid = require('uniqid');

@Injectable()
export class SessionService {

  constructor(
    private readonly logService: LogService,
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
      this.logService.error(e.message, {
        message: e.message,
        name: e.name,
        stack: e.stack,
      });
      return null;
    }
  }

}
