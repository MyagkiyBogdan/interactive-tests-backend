import "dotenv/config";
import app from "./app.js";
import db from "./db/connection.js";

const PORT = process.env.PORT || 8081;

const start = async () => {
  try {
    await db.connect();
    console.log("Database connection successful");
    app.listen(PORT, (err) => {
      if (err) {
        console.error("Error at server launch:", err);
      }
      console.log(`Server running. Use our API on port: ${PORT} `);
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
  }
};

start();
