import { User } from '../../models/User';
import { InferSchemaType } from 'mongoose';

type UserDocument = InferSchemaType<typeof User.schema>;
declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}