import ILaunch from "../types/launch.interface";

// 오브젝트와 달리 Map 은 필드 순서를 보장할뿐만 아니라 key 로 무엇이든 받을 수 있다.
const launches = new Map<number, ILaunch>();
let latestFlightNumber = 100;

const launch: ILaunch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('2030-12-27'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId: number) {
  return launches.has(launchId);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addLaunch(launch: ILaunch) {
  const flightNumber = ++latestFlightNumber;
  launches.set(flightNumber, {
    ...launch,
    flightNumber,
    success: true,
    upcoming: true,
    customer: ['Zero To Master', 'NASA'],
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