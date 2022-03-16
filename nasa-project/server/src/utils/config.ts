import dotenv from 'dotenv';
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, `../../env/${process.env.NODE_ENV === 'production' ? 'production.env' : 'development.env'}`),
});

export function getMongoURL() {
  return process.env.MONGO_URL as string;
}