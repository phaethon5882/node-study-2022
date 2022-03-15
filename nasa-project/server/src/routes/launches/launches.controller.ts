import {Request, Response} from "express";
import {addLaunch, getAllLaunches, abortLaunchById, existsLaunchWithId} from "../../models/launches.model";
import ILaunch from "../../types/launch.interface";

function httpGetAllLaunches(req: Request, res: Response) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req: Request, res: Response) {
  const launch = req.body as ILaunch;

  if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {
    return res.status(400).json({
      error: 'Missing required launch property',
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate.valueOf())) { // == if (launch.launchDate.toString() === 'Invalid Date') {
    return res.status(400).json({
      error: 'Invalid launch date',
    });
  }

  addLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req: Request, res: Response) {
  const launchId = Number(req.params.id);
  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: 'there is no such id',
    });
  }

  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

export {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
}
