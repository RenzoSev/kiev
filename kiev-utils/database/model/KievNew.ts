import { Document, Schema, model } from 'mongoose';
import Date from '../../types/Date';
import Hierarchy from '../../types/Hierarchy';

interface KievNew extends Document {
  title: string;
  date?: Date;
  srcImage: string;
  hierarchy: Hierarchy;
}

const KieNewSchema = new Schema(
  {
    title: { type: String, required: true },
    srcImage: { type: String, required: true },
    hierarchy: { type: String, require: true },
    date: Object,
  },
  { collection: 'kiev_news' }
);

export default model<KievNew>('KievNew', KieNewSchema);
