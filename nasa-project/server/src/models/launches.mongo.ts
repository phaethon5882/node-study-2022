import {model, Schema} from "mongoose";
import type Launch from "../types/launch.interface";
import planetsModel from "./planets.mongo";

const launchesSchema = new Schema<Launch>({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: Schema.Types.ObjectId,
    ref: planetsModel.modelName,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// connecting launchesSchema to launch collection
const launchesModel = model('Launch', launchesSchema);

export default launchesModel;