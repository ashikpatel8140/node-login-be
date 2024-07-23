import { Router } from "express";
const router = Router();
import authenticate from "./middleware/autheticate";
import userRouter from "./modules/user";
import todoRouter from "./modules/todo";

interface RouteHandler {
  user: {
    // Define 'user' as a property with its own structure
    path: Router;
    IsPrivateModule?: boolean;
  };
  todo: {
    path: Router;
    IsPrivateModule?: boolean;
  };
}

const handlers: RouteHandler = {
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
  res.status(404).json({
    code: 404,
    message: "API not found",
  });
});

export default router;
