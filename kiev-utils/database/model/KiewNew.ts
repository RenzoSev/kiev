import { Document, Schema, model } from 'mongoose';

interface KievNew extends Document {
  title: string;
  date?: string;
  srcImg: string;
}

const KieNewSchema = new Schema<KievNew>(
  {
    title: { type: String, required: true },
    srcImg: { type: String, required: true },
    date: String,
  },
  { collection: 'kiev_news' }
);

export default model<KievNew>('KievNew', KieNewSchema);
