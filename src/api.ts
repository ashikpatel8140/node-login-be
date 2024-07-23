import { Router } from "express";
import authenticate from "./middleware/autheticate";
import userRouter from "./modules/user";
import todoRouter from "./modules/todo";
import send from "./utils/responseMessage";
const router = Router();

const handlers:  Record<string, {path: Router, IsPrivateModule?: boolean}> = {
  user: {
    // Now assign an object with the required properties
    path: userRouter,
    IsPrivateModule: false,
  },
  todo: {
    path: todoRouter,
    IsPrivateModule: true,
  },
};

for (const [moduleName, handler] of Object.entries(handlers)) {
  const path = `/${moduleName}`; // Consistent prefixing

  if (handler.IsPrivateModule) {
    router.use(path, authenticate, handler.path);
  } else {
    router.use(path, handler.path);
  }
}

// Add a catch-all handler for unmatched routes (optional)
router.use("*", (req, res) => {
  return send(res, 404, "API Not Found")
});

export default router;
