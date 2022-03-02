import { Model } from 'mongoose';

export default class Temporary {
  static async addsTemporaryInDocuments<
    T,
    Q = unknown,
    C = unknown,
    P = unknown
  >(Model: Model<T, Q, C, P>) {
    await Model.updateMany(
      {},
      { $set: { temporary: true } },
      { strict: false }
    );
  }

  static async removeTemporaryDocuments<
    T,
    Q = unknown,
    C = unknown,
    P = unknown
  >(Model: Model<T, Q, C, P>) {
    await Model.deleteMany({ temporary: true }, { strict: false });
  }
}
