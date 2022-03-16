import launchesModel from "./launches.mongo";
import planetsModel from "./planets.mongo";
import type Launch from "../types/launch.interface";


// 오브젝트와 달리 Map 은 필드 순서를 보장할뿐만 아니라 key 로 무엇이든 받을 수 있다.
const launches = new Map<number, Launch>();
let latestFlightNumber = 100;

const launch: Launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('2030-12-27'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId: number) {
  return launches.has(launchId);
}

async function getAllLaunches() {
  const launches = await launchesModel.find({}, {
    '_id': 0,
    '__v': 0,
  });

  console.log({launches});

  return launches;
}

async function saveLaunch(newLaunch: Launch) {
  const planet = await planetsModel.findOne({
    keplerName: newLaunch.target,
  });

  if (!planet) {
    throw new Error('No matching planet found!');
  }

  await launchesModel.updateOne({
    flightNumber: newLaunch.flightNumber
  }, newLaunch, {
    upsert: true,
  });
}

function addLaunch(launch: Launch) {
  const flightNumber = ++latestFlightNumber;
  launches.set(flightNumber, {
    ...launch,
    flightNumber,
    success: true,
    upcoming: true,
    customers: ['Zero To Master', 'NASA'],
  });
}

function abortLaunchById(launchId: number) {
  // launches.delete(launchId);
  const aborted = launches.get(launchId)!;
  aborted.success = false;
  aborted.upcoming = false;

  launches.set(launchId, aborted);
  return aborted;
}

export {
  existsLaunchWithId,
  getAllLaunches,
  addLaunch,
  abortLaunchById,
};