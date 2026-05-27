import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

// fallback for tests
process.env.VITE_API_URL = process.env.VITE_API_URL || "http://localhost:4000";
