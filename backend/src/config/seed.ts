import User from "../models/User";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  const existingAdmin = await User.findOne({ email: "admin@example.com" });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash("adminpass", 10);
    await User.create({
      username: "admin",
      email: "admin@example.com",
      password: hashed,
      phone: "password",
      role: "admin",
    });
    console.log("✅ Admin user seeded");
  } else {
    console.log("ℹ️ Admin user already exists");
  }
};
