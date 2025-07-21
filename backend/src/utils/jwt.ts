import jwt from "jsonwebtoken";

export const generateToken = (user: any) =>
  jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
