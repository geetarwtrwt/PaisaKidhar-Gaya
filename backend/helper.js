import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export let validToken = async () => {
  try {
    let userCookie = await cookies();
    let token = userCookie.get("token")?.value;
    if (!token) {
      throw new Error("Token not found");
    }
    let verify = jwt.verify(token, "geeta11");
    return verify;
  } catch (err) {
    throw new Error(err.message);
  }
};
