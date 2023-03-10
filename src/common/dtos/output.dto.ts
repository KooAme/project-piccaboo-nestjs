import { Entity } from 'typeorm';

@Entity()
export class CoreOutput {
  ok: boolean;
  error?: string;
}
