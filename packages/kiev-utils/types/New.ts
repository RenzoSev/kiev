import Date from './Date';
import Hierarchy from './Hierarchy';
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

export interface HierarchyNew extends New {
  hierarchy: Hierarchy;
}
