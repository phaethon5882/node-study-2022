import {Request, Response} from "express";
import friends from "../models/friends.model";

function getFriends(req: Request, res: Response) {
  res.json(friends);
}

function postFriend(req: Request, res: Response) {
  if (!req.body.name) {
    // return 을 해줘야 56번째 줄 res.json 이 호출되지 않음.
    return res.status(400).json({
      error: 'name 값이 올바르지 않습니다.',
    });
  }

  const newFriend = {
    id: friends.length,
    name: req.body.name,
  };

  friends.push(newFriend);

  res.json(newFriend);
}

function getFriend(req: Request, res: Response) {
  const friendId = Number(req.params.friendId);
  const friend = friends[friendId];

  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: 'Friend does not exist.'
    });
  }
}

const friendsController = {
  getFriends,
  postFriend,
  getFriend,
};

export default friendsController;




