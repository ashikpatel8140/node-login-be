import { sign, verify } from "jsonwebtoken";
import { compare,  hashSync } from "bcrypt";


export const generateAuthToken = async (criteriaForJwt: any, key: string) => {
  try {
    const token = await sign(criteriaForJwt, key);
    return token;
  } catch (error) {
    throw error;
  }
};

export const findByToken = (token: string, key: string) =>
  verify(token, key);

