/* tslint:disable:variable-name */
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne } from 'typeorm';
import { Session } from '../session/session.entity';

@Entity()
export class Event {

  @PrimaryGeneratedColumn()
  event_id: number;

  @Column({length: 250})
  @ManyToOne(type => Session, session => session.session_id)
  session_id: string;

  @Column({length: 250})
  category: string;

  @Column({length: 250})
  event: string;

  @Column({length: 250, default: ''})
  action: string;

  @Column({length: 250, default: ''})
  label: string;

  @Column()
  created_at: Date;

  @BeforeInsert()
  beforeInsert() {
    this.created_at = new Date();
  }

  @ManyToOne(() => Session, session => session.session_id)
  session: Session;
}
