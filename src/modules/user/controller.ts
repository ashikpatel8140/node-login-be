import { Request, Response } from "express";
import { checkKeys } from "../../utils/common";
import send from "../../utils/responseMessage";
import UserModel from "./model";
import {
  generateAuthToken,
} from "../../utils/encryption";
import { compare, hash } from "bcrypt";

export async function signUp(req: Request, res: Response) {
  try {
    const requiredFields = ["name", "email", "password"];
    let valid = await checkKeys(req.body, requiredFields);
    if (!valid) return send(res, 400);
    const { name, email, password } = req.body;

    let alreadyExist = await UserModel.findOne({ email });
    if (alreadyExist) {
      return send(res, 409, "Email already exists!");
    }
    
    let saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    let hashPassword: string = await hash(password, saltRounds);
    console.log(hashPassword);
    let user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    if (!user) {
      return send(res, 500);
    }
    return send(res, 201, "User Created Successfully");
  } catch (error) {
    console.log(error);
    
    return send(res, 500);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const requiredFields = ["email", "password"];
    let valid = await checkKeys(req.body, requiredFields);
    if (!valid) return send(res, 400);
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (
      user &&
      (await compare(password, user.password as string))
    ) {
      const criteriaForJWT = {
        _id: user._id,
      };
      const token = await generateAuthToken(criteriaForJWT, process.env.JWT_PRIVATE_KEY as string);
      res.cookie("Authorization", token);
      let data = {
        token,
        user: {
          name: user.name,
          email,
        },
      };

      return send(res, 200, "Login Successfully", data);
    }

    return send(res, 404, "Login Failed!");
  } catch (error) {
    console.log(error);

    return send(res, 500);
  }
}

export async function profile(req: Request, res: Response) {
  try {
    let user = await UserModel.findById((req as any).user._id, {
      password: 0,
    });
    if (!user) {
      return send(res, 404);
    }

    return send(res, 200, "", user);
  } catch (error) {
    return send(res, 500);
  }
}
