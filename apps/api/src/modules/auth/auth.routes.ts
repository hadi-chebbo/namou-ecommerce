import { Router } from "express";
import * as authController from "./auth.controller";
import { loginSchema } from "./auth.validation";
import { validate } from "../../middlewares/validate";
import { authenticate } from "../../middlewares/authenticate";


const router = Router();

router.post(
    "/login",
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