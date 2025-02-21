import { Router } from "express";
import { controller } from "../controllers/postController"

const router = Router();

router.get("/posts", controller.getAll);
router.get("/posts/:id", controller.getById);

export default router;
