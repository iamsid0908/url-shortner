import { Router } from "express";
import { handleError } from "../utils/error";
import {
  GetAnayticsByTopic,
  GetAnyticsofAlias,
  GetOverAllAnalytics,
} from "../controller/analytics";
import verifyToken from "../middleware/auth";

const analyticsRoutes = Router();

analyticsRoutes.get(
  "/api/:shortId",
  handleError(verifyToken),
  handleError(GetAnyticsofAlias)
);
analyticsRoutes.get(
  "/topic/:topic",
  handleError(verifyToken),
  handleError(GetAnayticsByTopic)
);

analyticsRoutes.get(
  "/overall",
  handleError(verifyToken),
  handleError(GetOverAllAnalytics)
);

export default analyticsRoutes;
