import express from "express";
import { handleRefresh } from "./refreshController";
const router = express.Router();

router.get("/", handleRefresh);

export default router;
