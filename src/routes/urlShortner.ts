import { Router } from "express";
import { handleError } from "../utils/error";
import {
  handleCreateShortUrl,
  handleRedirectShortUrl,
} from "../controller/urlshortner";
import verifyToken from "../middleware/auth";

const urlShortnerRoutes = Router();
urlShortnerRoutes.post(
  "/shorten",
  handleError(verifyToken),
  handleError(handleCreateShortUrl)
);

urlShortnerRoutes.get(
  "/redirect/shorten/:shortId",
  handleError(handleRedirectShortUrl)
);

export default urlShortnerRoutes;
