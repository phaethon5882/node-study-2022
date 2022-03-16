import fs from "fs";
import path from "path";
import {parse} from "csv-parse";
import type PlanetCSV from "../types/planetCSV.interface";
import planetsModel from "./planets.mongo";

function isHabitablePlanet(planet: PlanetCSV) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && Number(planet['koi_insol']) > 0.36 && Number(planet['koi_insol']) < 1.11
    && Number(planet['koi_prad']) < 1.6;
}

function loadPlanetsData(): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, '../../data/kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true,
      }))
      .on('data', async (planet: PlanetCSV) => {
        if (isHabitablePlanet(planet)) {
          // 이렇게 하면 매번 새로 집어넣을테니까
          // await planetsModel.create({
          //   keplerName: planet.kepler_name,
          // });
          await savePlanet(planet);
        }
      })
      .on('error', (err) => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  // 필터를 비우면 모든 다큐먼트 내의 모든 필드를 반환한다. ( _id, __v 가 같이 포함돼서 나올 것임 )
  // return await planetsModel.find({});
  // projection 옵션에 필드명: boolean | number 로 보여질 대상을 선택할 수 있다.
  return planetsModel.find({}, {
    '_id': false,
    '__v': false,
  });
}

async function savePlanet(planet: PlanetCSV) {
  try {
    await planetsModel.updateOne({
      keplerName: planet.kepler_name,
    }, {
      keplerName: planet.kepler_name,
    }, {
      upsert: true,
    });
  } catch (err) {
    console.error(`Could not save plant ${err}`);
  }
}

export {
  loadPlanetsData,
  getAllPlanets,
};