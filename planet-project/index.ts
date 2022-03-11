import {parse} from 'csv-parse';
import fs from 'fs';
import IPlanet from "./types/kepler/planet.interface";

// CSV 파일 읽기
const habitablePlanets: IPlanet[] = [];

function isHabitablePlanet(planet: IPlanet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && Number(planet['koi_insol']) > 0.36 && Number(planet['koi_insol']) < 1.11
    && Number(planet['koi_prad']) < 1.6;
}

fs.createReadStream('kepler_data.csv')
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
  })
  .on('end', () => {
    console.log(habitablePlanets.map((planet) => {
      return planet['kepler_name'];
    }));
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });