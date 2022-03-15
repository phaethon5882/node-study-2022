import fs from "fs";
import path from "path";
import {parse} from "csv-parse";
import IPlanet from "../types/planet.interface";

const habitablePlanets: IPlanet[] = [];

function isHabitablePlanet(planet: IPlanet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && Number(planet['koi_insol']) > 0.36 && Number(planet['koi_insol']) < 1.11
    && Number(planet['koi_prad']) < 1.6;
}

export function loadPlanetsData(): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, '../../data/kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', (planet: IPlanet) => {
        if (isHabitablePlanet(planet)) {
          habitablePlanets.push(planet);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        resolve();
      });
  });
}

export default habitablePlanets;