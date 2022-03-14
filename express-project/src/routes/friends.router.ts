import express from "express";
import friendsController from "../controllers/friends.controller";

const friendsRouter = express.Router();

// 라우터에도 미들웨어를 걸 수 있다!
friendsRouter.use((req, res, next) => {
  console.log(`ip address: ${req.ip}`);
  next();
});

friendsRouter.post('/', friendsController.postFriend);
friendsRouter.get('/', friendsController.getFriends);
friendsRouter.get('/:friendId', friendsController.getFriend);

export default friendsRouter;