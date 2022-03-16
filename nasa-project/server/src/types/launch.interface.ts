import type Planet from "./planet.interface";

export default interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  target: Planet['_id'],
  customers: string[],
  upcoming: boolean,
  success: boolean;
}