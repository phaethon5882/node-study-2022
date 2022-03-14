import {Request, Response} from "express";

function getMessages(req: Request, res: Response) {
  res.render('messages', {
    title: 'Messages to my Friends!',
    friend: 'Yunki Baek',
  });
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