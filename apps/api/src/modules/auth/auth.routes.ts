import { Router } from "express";
import * as authController from "./auth.controller";
import { loginSchema } from "./auth.validation";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/authenticate";
import { authRateLimiter } from "../../middlewares/rateLimiter";


const router = Router();

router.post(
    "/login",
    authRateLimiter,
    validate(loginSchema, "body"),
    authController.login,
);

router.get(
    "/me",
    authenticate,
    authController.me,
);

router.post(
    "/logout",
    authenticate,
    authController.logout,
);

export default router;