import express from "express";
import path from "path";

const imagesRouter = express.Router();

imagesRouter.get('/', (req, res) => {
  // ERROR: 경로는 절대경로야함 res.sendFile('skimountain.jpeg');
  // res.sendFile(path.join(__dirname, '../../', 'public', 'skimountain.jpeg'));
  res.sendFile(path.resolve(__dirname, '../../public/', 'skimountain.jpeg'));
});

export default imagesRouter;