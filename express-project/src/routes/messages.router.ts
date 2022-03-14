import express from "express";
import messageController from "../controllers/messages.controller";

const messagesRouter = express.Router();

messagesRouter.get('/', messageController.getMessages);
messagesRouter.post('/', messageController.postMessage);

export default messagesRouter;
