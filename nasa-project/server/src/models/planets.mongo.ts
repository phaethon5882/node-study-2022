import {model, Schema} from "mongoose";
import type Planet from "../types/planet.interface";

const planetsSchema = new Schema<Planet>({
  keplerName: {
    type: String,
    required: true,
  },
});

const planetsModel = model('Planet', planetsSchema);

export default planetsModel;