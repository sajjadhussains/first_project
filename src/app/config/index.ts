import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 3000,
  database_url:
    process.env.DATABASE_URL || "mongodb://localhost:27017/first_project",
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
