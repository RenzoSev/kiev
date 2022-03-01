import { Date } from '../../cron/src/utils/date';

export interface New {
  title: string;
  srcImage: string;
  date?: Date;
}

export interface NewData {
  title: string;
  srcImage: string;
  date?: string;
}
