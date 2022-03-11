import Date from './Date';
import Hierarchy from './Hierarchy';

export interface NewData {
  title: string;
  srcImage: string;
  href: string;
  date?: string;
}
export interface New {
  title: string;
  srcImage: string;
  href: string;
  date?: Date;
}

export interface HierarchyNew extends New {
  hierarchy?: Hierarchy;
}
