import express, { request, response } from "express";
import multer from "multer";

import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";

import multerConfig from "./config/multer";
const upload = multer(multerConfig);


const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);

routes.post("/points", upload.single("image"), pointsController.create);
routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

export default routes;