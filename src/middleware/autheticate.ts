import { NextFunction, Request, Response } from "express";
import UserModel from "../modules/user/model";
import send from "../utils/responseMessage";
import { findByToken } from "../utils/encryption";

async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    let token;
    let authHeader: any =
      req.headers?.Authorization || req.headers?.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      if (token) {
        let userExist: any = await findByToken(token, process.env.JWT_PRIVATE_KEY as string);

        if (userExist) {
          let user = await UserModel.findById(userExist._id).select({
            password: 0,
          });

          if (user) {
            (req as any).user = user;
          }

          next();
        } else {
          return send(res, 401);
        }
      }
    } else {
      return send(res, 401);
    }
  } catch (error) {
    return send(res, 401);
  }
}

export default authenticate;
