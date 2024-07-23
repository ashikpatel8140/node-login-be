import { Request, Response, Router } from "express";
import authenticate from "../../middleware/autheticate";
import { login, signUp, profile } from "./controller";
const userRouter = Router();

userRouter.post("/signup", signUp);

userRouter.post("/login",login);

userRouter.get("/me", authenticate, profile);

export default userRouter;
