import {Document} from "mongoose";

export default interface Planet extends Document {
  keplerName: string;
}