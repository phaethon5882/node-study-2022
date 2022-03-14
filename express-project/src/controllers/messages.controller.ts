import {Request, Response} from "express";

function getMessages(req: Request, res: Response) {
  res.send('<ul><li>Hello Yunki</li></ul>');
}

function postMessage(req: Request, res: Response) {
  console.log('Updating messages....');
  req.pipe(res);
}

const messageController = {
  getMessages,
  postMessage,
};

export default messageController;